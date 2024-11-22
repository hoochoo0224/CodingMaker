import '../../styles/chat/chat-message.css'

export function ChatMessage({ message, sender }) {
  const messageClass = `chat-message chat-message--${sender}`
  const bubbleClass = `message-bubble message-bubble--${sender}`

  return (
    <div className={messageClass}>
      <div className={bubbleClass}>
        {message}
      </div>
    </div>
  )
}