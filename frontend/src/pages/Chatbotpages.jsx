import { useState, useEffect, useRef } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { getChatResponse } from '@/services/chatServices'
import { ChatMessage } from '@/components/chat/ChatMessage'
import { ChatHeader } from '@/components/chat/ChatHeader'
import { ChatInput } from '@/components/chat/ChatInput'
import '../styles/pages/chatbot.css'
import axios from 'axios'

export default function ChatbotPage() {
  const [messages, setMessages] = useState([
    { id: 1, text: "안녕하세요! 무엇을 도와드릴까요?", sender: 'bot' }
  ])
  const [inputMessage, setInputMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const chatContentRef = useRef(null)
  const messagesEndRef = useRef(null)
  const [conversationId, setConversationId] = useState(null);

  useEffect(() => {
    const loadChatHistory = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/chat/');
        if (response.data && Array.isArray(response.data)) {
          const history = response.data.map((item, index) => ({
            id: index + 2,
            text: item.ai_response || item.message,
            sender: item.ai_response ? 'bot' : 'user'
          }));

          setMessages(prev => [prev[0], ...history]);
        }
      } catch (error) {
        console.error('채팅 기록 로드 실패:', error);
      }
    };

    loadChatHistory();
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView()
  }, [messages])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!inputMessage.trim() || isLoading) return

    try {
      setIsLoading(true)
      const userMessage = {
        id: Date.now(),
        text: inputMessage,
        sender: 'user'
      }
      setMessages(prev => [...prev, userMessage])
      setInputMessage('')
      
      const response = await getChatResponse(inputMessage, conversationId)
      setConversationId(response.conversation_id)
      
      const aiMessage = {
        id: Date.now() + 1,
        text: response.message,
        sender: 'bot'
      }
      setMessages(prev => [...prev, aiMessage])
    } catch (error) {
      console.error('Error:', error)
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        text: "죄송합니다. 오류가 발생했습니다.",
        sender: 'bot'
      }])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="chatbot-container">
      <div className="chatbot-main">
        <div className="chat-window">
          <ChatHeader />
          <div 
            ref={chatContentRef}
            className="chat-content" 
            style={{ 
              height: "calc(100vh - 180px)",
              overflowY: "auto",
              padding: "1rem"
            }}
          >
            {messages.map(message => (
              <ChatMessage 
                key={message.id}
                message={message.text}
                sender={message.sender}
              />
            ))}
            <div ref={messagesEndRef} />
          </div>
          <ChatInput
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onSubmit={handleSubmit}
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>
  )
}