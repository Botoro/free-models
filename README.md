# Free Models

Repositorio pequeño para probar modelos de IA gratuitos o con acceso público mediante tres proveedores:
- Groq
- Google Gemini
- OpenRouter

## Requisitos

- Node.js 18+ (o compatible con `type: "module"`)
- `npm` o `pnpm`
- Variables de entorno con las claves de API según el proveedor

## Instalación

```bash
npm install
```

## Variables de entorno

Crea un archivo `.env` en la raíz del proyecto y define la clave correspondiente.

```env
# Groq
GROQ_API_KEY=tu_clave_groq

# Google Gemini
GOOGLE_API_KEY=tu_clave_google

# OpenRouter
OPENROUTER_API_KEY=tu_clave_openrouter
# Opcional: cambiar el modelo por defecto
OPENROUTER_MODEL=openai/gpt-5.2
```

> Si no quieres usar `.env`, puedes exportar las variables antes de ejecutar el comando:
>
> ```bash
> export GROQ_API_KEY=...
> export GOOGLE_API_KEY=...
> export OPENROUTER_API_KEY=...
> ```

## Uso

El entrypoint principal es `index.js` y acepta el nombre del proveedor como primer argumento.

```bash
node index.js <groq | google | openrouter>
```

### Chat interactivo

```bash
node index.js groq
node index.js google
node index.js openrouter
```

Escribe mensajes y responde el modelo. Usa `exit` o `salir` para terminar.

### Llamada única con prompt

```bash
node index.js groq "¿Cuál es la capital de Francia?"
node index.js google "Explica cómo funciona la IA"
node index.js openrouter "What is the meaning of life?"
```

## Scripts disponibles

```bash
npm start            # node index.js
npm run groq         # node index.js groq
npm run google       # node index.js google
npm run openrouter   # node index.js openrouter
```

## Proveedores y enlaces útiles

Aquí tienes los enlaces a la documentación y recursos de cada proveedor para obtener más información sobre sus modelos gratuitos, límites de uso y cómo obtener tus claves de API.

### Groq
- https://groq.com/
- https://console.groq.com/docs/rate-limits

### Google
- https://aistudio.google.com/api-keys
- https://aistudio.google.com/rate-limit

### OpenRouter
- https://openrouter.ai
- https://openrouter.ai/docs/faq#how-are-rate-limits-calculated
- https://openrouter.ai/collections/free-models

## Nota

Cada proveedor usa su propia clave de API y endpoint. Asegúrate de tener creado un cuenta válida antes de llamar a los servicios.

<p align="center">Hecho con ❤️ por Botoro</p>
