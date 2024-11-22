from flask import Flask
from flask_cors import CORS
from chat import chat_bp
from config import Config

app = Flask(__name__)
CORS(app)

# 설정 적용
app.config.from_object(Config)

# 블루프린트 등록
app.register_blueprint(chat_bp)

if __name__ == '__main__':
    app.run(debug=True, port=8000)