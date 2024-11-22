import axios from 'axios';

export const getChatResponse = async (message, conversationId = null) => {
  try {
    const response = await axios.post('http://localhost:8000/api/chat', {
      message,
      conversation_id: conversationId
    });
    return response.data;
  } catch (error) {
    console.error('Chat API Error:', error);
    throw new Error('챗봇 응답 중 오류가 발생했습니다.');
  }
};

export const getChatHistory = async (conversationId = 'default') => {
  try {
    const response = await axios.get(`http://localhost:8000/api/chat/?conversation_id=${conversationId}`);
    return response.data;
  } catch (error) {
    console.error('Chat History Error:', error);
    throw new Error('대화 기록을 불러오는데 실패했습니다.');
  }
};