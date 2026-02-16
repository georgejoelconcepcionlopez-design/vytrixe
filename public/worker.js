
import { pipeline, env } from 'https://cdn.jsdelivr.net/npm/@xenova/transformers@2.14.0';

// Skip local model check
env.allowLocalModels = false;
env.useBrowserCache = true;

class PipelineSingleton {
    static task = 'automatic-speech-recognition';
    static model = 'Xenova/whisper-tiny';
    static instance = null;

    static async getInstance(progressCallback = null) {
        if (this.instance === null) {
            this.instance = await pipeline(this.task, this.model, { progress_callback: progressCallback });
        }
        return this.instance;
    }
}

self.addEventListener('message', async (event) => {
    const { type, audio, language } = event.data;

    if (type === 'transcribe') {
        try {
            const transcriber = await PipelineSingleton.getInstance((data) => {
                self.postMessage({
                    type: 'download',
                    data
                });
            });

            const output = await transcriber(audio, {
                chunk_length_s: 30,
                stride_length_s: 5,
                language: language || 'english',
                task: 'transcribe',
                return_timestamps: true,
            });

            self.postMessage({
                type: 'complete',
                data: output
            });
        } catch (error) {
            self.postMessage({
                type: 'error',
                data: error.message
            });
        }
    }
});
