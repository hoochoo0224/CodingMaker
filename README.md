# AI Chatbot Project

AI 챗봇 프로젝트입니다. React와 Flask를 사용하여 구현되었으며, OpenAI의 GPT-3.5 모델과 Langchain을 활용합니다.

## 파일 구조 설명

### Frontend (React)
frontend/
├── src/
│   ├── components/                      # 재사용 가능한 컴포넌트들
│   │   ├── chat/                       # 채팅 관련 컴포넌트
│   │   │   ├── ChatHeader.jsx          # 채팅창 상단 헤더 컴포넌트
│   │   │   ├── ChatInput.jsx           # 메시지 입력 폼 컴포넌트
│   │   │   └── ChatMessage.jsx         # 개별 채팅 메시지 컴포넌트
│   │   └── ui/                         # 공통 UI 컴포넌트
│   │       ├── Button.jsx              # 재사용 가능한 버튼 컴포넌트
│   │       ├── Input.jsx               # 재사용 가능한 입력 필드 컴포넌트
│   │       └── ScrollArea.jsx          # 스크롤 영역 컴포넌트
│   ├── pages/                          # 페이지 컴포넌트들
│   │   └── Chatbotpages.jsx           # 메인 채팅 페이지
│   ├── services/                       # API 통신 관련 서비스
│   │   └── chatServices.js            # 채팅 관련 API 호출 함수들
│   ├── styles/                         # 스타일 파일들
│   │   ├── chat/                      # 채팅 관련 스타일
│   │   └── ui/                        # UI 컴포넌트 스타일
│   ├── App.jsx                         # 앱의 메인 컴포넌트
│   └── main.jsx                        # React 앱의 진입점
└── index.html                          # HTML 템플릿 파일

### Backend (Flask)
backend/
├── app.py              # Flask 애플리케이션 진입점
├── chat.py             # 채팅 관련 라우트 및 로직
├── config.py           # 설정 파일
├── requirements.txt    # Python 의존성
└── .env               # 환경 변수

## 주요 기능
- OpenAI GPT-3.5 기반 대화
- Langchain을 활용한 대화 맥락 유지
- 실시간 채팅 인터페이스
- 대화 기록 저장 및 조회

## 실행 방법

### 1. 프론트엔드 설정
# frontend 디렉토리로 이동
cd frontend

# 의존성 설치
tarn install

# 개발 서버 실행 (http://localhost:5173)
yarn run vite

### 2. 백엔드 설정
# 가상환경 생성 및 활성화
# Windows
python -m venv venv
venv\Scripts\activate

# Mac/Linux
python3 -m venv venv
source venv/bin/activate

# backend 디렉토리로 이동
cd backend

# 의존성 설치
pip install -r requirements.txt

# .env 파일 생성 및 API 키 설정
echo "OPENAI_API_KEY=your-api-key-here" > .env

# 서버 실행 (http://localhost:8000)
python app.py

## 필요한 패키지
### Frontend
- React
- Axios
- TailwindCSS
- React Router DOM

### Backend
- Flask
- Flask-CORS
- Langchain
- OpenAI
- python-dotenv

## 주의사항
1. OpenAI API 키가 반드시 필요합니다
2. 프론트엔드와 백엔드 서버를 동시에 실행해야 합니다
3. 가상환경 활성화 상태에서 백엔드 작업을 해야 합니다
4. CORS 설정이 되어 있으므로 개발 시 지정된 포트를 사용해야 합니다
5. 대화 기록은 서버 메모리에 저장되므로 서버 재시��� 시 초기화됩니다

## 환경 변수
- OPENAI_API_KEY: OpenAI API 키
- SECRET_KEY: Flask 세션 암호화 키

## 라이선스
MIT License
