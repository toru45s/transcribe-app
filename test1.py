import asyncio
import sounddevice as sd
import numpy as np

from amazon_transcribe.client import TranscribeStreamingClient
from amazon_transcribe.handlers import TranscriptResultStreamHandler
from amazon_transcribe.model import TranscriptEvent


# Transcribe event handler
class MyEventHandler(TranscriptResultStreamHandler):
    async def handle_transcript_event(self, transcript_event: TranscriptEvent):
        for result in transcript_event.transcript.results:
            for alt in result.alternatives:
                print(alt.transcript)


# Mic stream sender
async def microphone_stream(stream):
    samplerate = 16000
    blocksize = 1024
    channels = 1

    loop = asyncio.get_running_loop()  # ✅ get the running event loop here

    def callback(indata, frames, time, status):
        audio_chunk = indata.tobytes()
        asyncio.run_coroutine_threadsafe(
            stream.input_stream.send_audio_event(audio_chunk=audio_chunk),
            loop  # ✅ use the captured loop
        )

    with sd.InputStream(
        samplerate=samplerate,
        blocksize=blocksize,
        dtype='int16',
        channels=channels,
        callback=callback
    ):
        print("🎤 Start speaking (Ctrl+C to stop)...")
        await asyncio.sleep(60)  # record for 60 seconds
        await stream.input_stream.end_stream()

# Main transcription function
async def main():
    print("Starting main")
    client = TranscribeStreamingClient(region="us-west-2")
    print(client)
    stream = await client.start_stream_transcription(
        # language_code="en-US",
        identify_language=True,
        media_sample_rate_hz=16000,
        media_encoding="pcm"
    )

    handler = MyEventHandler(stream.output_stream)
    await asyncio.gather(
        microphone_stream(stream),
        handler.handle_events()
    )

# Run the app
print("Running main")
asyncio.run(main())