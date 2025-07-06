from fastapi import FastAPI, WebSocket
from amazon_transcribe.client import TranscribeStreamingClient
from amazon_transcribe.handlers import TranscriptResultStreamHandler
from amazon_transcribe.model import TranscriptEvent
import asyncio

app = FastAPI()

class WSHandler(TranscriptResultStreamHandler):
    def __init__(self, output_stream, websocket):
        super().__init__(output_stream)
        self.websocket = websocket

    async def handle_transcript_event(self, event: TranscriptEvent):
        for result in event.transcript.results:
            for alt in result.alternatives:
                await self.websocket.send_text(alt.transcript)

@app.websocket("/ws")
async def transcribe_ws(websocket: WebSocket):
    print("Accepting websocket ----------------")
    await websocket.accept()

    import boto3
    boto3.setup_default_session(profile_name="t.yaginuma")
    
    client = TranscribeStreamingClient(region="us-west-2")
    stream = await client.start_stream_transcription(
        language_code="en-US",
        media_sample_rate_hz=16000,
        media_encoding="pcm"
    )

    handler = WSHandler(stream.output_stream, websocket)

    async def receive_audio():
        while True:
            audio = await websocket.receive_bytes()
            await stream.input_stream.send_audio_event(audio_chunk=audio)

    await asyncio.gather(receive_audio(), handler.handle_events())