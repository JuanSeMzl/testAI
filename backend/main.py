import json
import os

from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from openai import OpenAI

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

client = OpenAI(api_key=os.environ['OPEN_AI_API_KEY'])

@app.post("/process-message")
async def process_text(request: Request):
    data = await request.json()
    message = data.get("message")

    if not message:
        return {"error": "Empty input."}
    
    if len(message) < 10:
        return {"error": "Message too short."}

    if len(message.split()) < 3:
        return {"error": "Please enter a complete sentence."}

    if not any(char.isalpha() for char in message):
        return {"error": "Input must contain letters."}

    tones = ["professional", "casual", "polite", "social media"]

    def generate():
        for tone in tones:
            prompt = f"Please rewrite the message in a {tone} tone:\n\n{message}"

            response = client.chat.completions.create(
                model="gpt-3.5-turbo",
                messages=[{"role": "user", "content": prompt}],
                temperature=0.7,
                max_tokens=200,
                stream=True
            )

            for chunk in response:
                if chunk.choices and chunk.choices[0].delta and chunk.choices[0].delta.content:
                    word = chunk.choices[0].delta.content
                    data = json.dumps({"tone": tone, "word": word})
                    yield f"data: {data}\n\n"

            yield f"data: {json.dumps({'tone': tone, 'done': True})}\n\n"

    return StreamingResponse(generate(), media_type="text/event-stream")
