import axios from 'axios';

const GROQ_URL = 'https://api.groq.com/openai/v1/chat/completions';
const MODEL = 'llama-3.3-70b-versatile';

function getApiKey() {
    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
        throw new Error('GROQ_API_KEY no está definido. Usa export GROQ_API_KEY=...');
    }
    return apiKey;
}

export async function query(prompt) {
    const apiKey = getApiKey();
    console.time('Groq response time');
    const response = await axios.post(
        GROQ_URL,
        {
            model: MODEL,
            messages: [{ role: 'user', content: prompt }],
            temperature: 1,
            max_completion_tokens: 1024,
            top_p: 1,
            stream: false,
            stop: null,
        },
        {
            headers: {
                Authorization: `Bearer ${apiKey}`,
                'Content-Type': 'application/json',
            },
        }
    );
    console.timeEnd('Groq response time');

    return response.data?.choices?.[0]?.message?.content ?? null;
}
