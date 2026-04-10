import readline from 'readline';
import dotenv from 'dotenv';

dotenv.config();

const model = process.argv[2]?.toLowerCase();
const prompt = process.argv.slice(3).join(' ');

const targets = {
    groq: './groq.js',
    google: './google.js',
    openrourter: './openrouter.js',
};

function printUsage() {
    console.log('Uso: node index.js <groq|google|openrouter> [mensaje opcional]');
    console.log('Si no pasas mensaje, inicia un chat interactivo.');
    console.log('Si pasas mensaje, hace una llamada única y muestra la respuesta.');
    console.log('Ejemplos:');
    console.log('  node index.js groq');
    console.log('  node index.js groq "¿Cuál es la capital de Francia?"');
    console.log('  node index.js google');
    console.log('  node index.js google "Explica cómo funciona la IA"');
    console.log('  node index.js openrouter');
    console.log('  node index.js openrouter "What is the meaning of life?"');
}

if (!model || !targets[model]) {
    printUsage();
    process.exit(1);
}

const selectedPrompt = prompt || (model === 'google'
    ? 'Explica cómo funciona la IA en pocas palabras'
    : '¿Cuál es la capital de Francia?');

async function chat(module, title) {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: 'Tú> ',
    });

    console.log(`Iniciando chat con ${title}. Escribe "exit" o "salir" para terminar.`);
    rl.prompt();

    for await (const line of rl) {
        const text = line.trim();

        if (!text) {
            rl.prompt();
            continue;
        }

        if (text.toLowerCase() === 'exit' || text.toLowerCase() === 'salir') {
            console.log('Hasta luego.');
            break;
        }

        try {
            const response = await module.query(text);
            console.log(`\n${title}> ${response || '(sin respuesta)'}\n`);
        } catch (err) {
            console.error('Error:', err.message ?? err);
            if (err.response) {
                console.error('Respuesta del servidor:', err.response.data ?? err.response);
            }
            break;
        }

        rl.prompt();
    }

    rl.close();
}

async function main() {
    const modulePath = targets[model];
    const module = await import(modulePath);

    if (prompt) {
        const response = await module.query(selectedPrompt);
        console.log(`\n=== ${model === 'groq' ? 'Groq' : model === 'google' ? 'Google Gemini' : 'OpenRouter'} ===`);
        console.log(response || '(sin respuesta)');
        return;
    }

    await chat(module, model === 'groq' ? 'Groq' : model === 'google' ? 'Google' : 'OpenRouter');
}

main().catch((err) => {
    console.error('Error de ejecución:', err.message ?? err);
    if (err.response) {
        console.error('Respuesta del servidor:', err.response.data ?? err.response);
    }
    process.exit(1);
});