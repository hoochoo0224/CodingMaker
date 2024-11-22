from flask import Blueprint, request, jsonify
from langchain.memory import ConversationBufferMemory
from langchain.chains import ConversationChain
from langchain.chat_models import ChatOpenAI
from langchain.prompts import (
    ChatPromptTemplate,
    MessagesPlaceholder,
    SystemMessagePromptTemplate,
    HumanMessagePromptTemplate,
)
from config import Config

chat_bp = Blueprint('chat', __name__)

class ChatManager:
    def __init__(self, api_key):
        self.conversations = {}
        self.api_key = api_key

    def get_conversation(self, conversation_id):
        if conversation_id not in self.conversations:
            llm = ChatOpenAI(
                temperature=0.7,
                model_name="gpt-3.5-turbo",
                openai_api_key=self.api_key
            )

            # 프롬프트 템플릿 정의
            prompt = ChatPromptTemplate.from_messages([
                SystemMessagePromptTemplate.from_template(
                    "당신은 이전 대화를 정확히 기억하고 맥락을 유지하는 AI 어시스턴트입니다. "
                    "사용자의 이전 메시지들을 참고하여 일관성 있게 대화를 이어가세요."
                ),
                MessagesPlaceholder(variable_name="history"),
                HumanMessagePromptTemplate.from_template("{input}")
            ])

            # 메모리 설정 개선
            memory = ConversationBufferMemory(
                return_messages=True,
                human_prefix="사용자",
                ai_prefix="챗봇",
                memory_key="history"
            )

            chain = ConversationChain(
                llm=llm,
                memory=memory,
                prompt=prompt,
                verbose=True
            )
            
            self.conversations[conversation_id] = chain
        return self.conversations[conversation_id]

    def get_response(self, message, conversation_id='default'):
        conversation = self.get_conversation(conversation_id)
        response = conversation.predict(input=message)
        
        # 대화 기록 반환
        memory = conversation.memory.chat_memory.messages
        history = []
        for msg in memory:
            if hasattr(msg, 'content'):
                history.append({
                    'role': 'assistant' if msg.type == 'ai' else 'user',
                    'content': msg.content
                })
        
        return {
            'message': response,
            'conversation_id': conversation_id,
            'history': history
        }

# ChatManager 클래스 정의 후에 인스턴스 생성
chat_manager = ChatManager(Config.OPENAI_API_KEY)

@chat_bp.route('/api/chat/', methods=['GET'])
def get_chat_history():
    try:
        conversation_id = request.args.get('conversation_id', 'default')
        
        # 해당 대화가 존재하는지 확인
        if conversation_id not in chat_manager.conversations:
            return jsonify({
                'history': [],
                'message': '대화 기록이 없습니다.'
            })

        # 대화 기록 가져오기
        conversation = chat_manager.get_conversation(conversation_id)
        memory = conversation.memory.chat_memory.messages
        
        history = []
        for msg in memory:
            if hasattr(msg, 'content'):
                history.append({
                    'role': 'assistant' if msg.type == 'ai' else 'user',
                    'content': msg.content
                })

        return jsonify({
            'history': history,
            'conversation_id': conversation_id
        })

    except Exception as e:
        print(f"Error: {str(e)}")
        return jsonify({'error': str(e)}), 500

@chat_bp.route('/api/chat', methods=['POST'])
def chat():
    try:
        data = request.json
        user_message = data.get('message')
        conversation_id = data.get('conversation_id', 'default')
        
        if not user_message:
            return jsonify({'error': '메시지가 필요합니다'}), 400

        response = chat_manager.get_response(user_message, conversation_id)
        return jsonify(response)

    except Exception as e:
        print(f"Error: {str(e)}")
        return jsonify({'error': str(e)}), 500