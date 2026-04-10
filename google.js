import axios from 'axios';

const GOOGLE_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-lite:generateContent';

function getApiKey() {
    const apiKey = process.env.GOOGLE_API_KEY;
    if (!apiKey) {
        throw new Error('GOOGLE_API_KEY no está definido. Usa export GOOGLE_API_KEY=...');
    }
    return apiKey;
}

function extractContent(data) {
    return data?.candidates?.[0]?.content?.parts?.[0]?.text ?? data?.output?.[0]?.content ?? null;
}

export async function query(prompt) {
    const apiKey = getApiKey();
    console.time('Google response time');
    const response = await axios.post(
        GOOGLE_URL,
        {
            contents: [
                {
                    parts: [
                        {
                            text: prompt,
                        },
                    ],
                },
            ],
        },
        {
            headers: {
                'Content-Type': 'application/json',
                'X-goog-api-key': apiKey,
            },
        }
    );
    console.timeEnd('Google response time');
    return extractContent(response.data) ?? JSON.stringify(response.data, null, 2);
}
