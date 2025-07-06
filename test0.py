# main.py
import asyncio
import aiofile
import boto3
from fastapi import FastAPI, WebSocket
from amazon_transcribe.client import TranscribeStreamingClient
from amazon_transcribe.handlers import TranscriptResultStreamHandler
from amazon_transcribe.model import TranscriptEvent

app = FastAPI()

# Explicitly set AWS profile if needed
boto3.setup_default_session(profile_name="t.yaginuma")

class WebSocketTranscriptHandler(TranscriptResultStreamHandler):
    def __init__(self, stream, websocket: WebSocket):
        super().__init__(stream)
        self.websocket = websocket

    async def handle_transcript_event(self, event: TranscriptEvent):
        for result in event.transcript.results:
            for alt in result.alternatives:
                await self.websocket.send_text(alt.transcript)

@app.websocket("/ws-transcribe")
async def transcribe_via_ws(websocket: WebSocket):
    await websocket.accept()
    await websocket.send_text("🔊 Starting transcription...")

    file_path = "kei.pcm"
    client = TranscribeStreamingClient(region="us-west-2")

    stream = await client.start_stream_transcription(
        language_code="en-US",
        media_sample_rate_hz=16000,
        media_encoding="pcm"
    )

    handler = WebSocketTranscriptHandler(stream.output_stream, websocket)

    async def send_audio():
        async with aiofile.AIOFile(file_path, 'rb') as afp:
            reader = aiofile.Reader(afp, chunk_size=1024 * 16)
            async for chunk in reader:
                await stream.input_stream.send_audio_event(audio_chunk=chunk)
        await stream.input_stream.end_stream()

    await asyncio.gather(send_audio(), handler.handle_events())
    await websocket.send_text("✅ Transcription complete.")
    await websocket.close()