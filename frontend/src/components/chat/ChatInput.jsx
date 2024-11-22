import '../../styles/chat/chat-input.css'
import { Input } from '../ui/Input'
import { Button } from '../ui/Button'

export function ChatInput({ value, onChange, onSubmit, isLoading }) {
  return (
    <form onSubmit={onSubmit} className="chat-input-container">
      <div className="chat-input-form">
        <Input
          value={value}
          onChange={onChange}
          placeholder="메시지를 입력하세요..."
          className="chat-input-field"
          disabled={isLoading}
        />
        <Button 
          type="submit" 
          disabled={isLoading}
          className="chat-submit-button"
        >
          {isLoading ? '전송 중...' : '전송'}
        </Button>
      </div>
    </form>
  )
}