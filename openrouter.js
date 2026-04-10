import axios from 'axios';

const OPENROUTER_URL = 'https://openrouter.ai/api/v1/chat/completions';
const MODEL = process.env.OPENROUTER_MODEL || 'openai/gpt-5.2';

function getApiKey() {
    const apiKey = process.env.OPENROUTER_API_KEY;
    if (!apiKey) {
        throw new Error('OPENROUTER_API_KEY no está definido. Usa export OPENROUTER_API_KEY=...');
    }
    return apiKey;
}

export async function query(prompt) {
    const apiKey = getApiKey();
    console.time('OpenRouter response time');
    const response = await axios.post(
        OPENROUTER_URL,
        {
            model: MODEL,
            messages: [
                {
                    role: 'user',
                    content: prompt,
                },
            ],
            max_tokens: 150,
        },
        {
            headers: {
                Authorization: `Bearer ${apiKey}`,
                'Content-Type': 'application/json',
            },
        }
    );
    console.timeEnd('OpenRouter response time');
    return response.data?.choices?.[0]?.message?.content ?? JSON.stringify(response.data, null, 2);
}
