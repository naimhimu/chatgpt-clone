// netlify/functions/chatgpt.js
export async function handler(event, context) {
  try {
    const { message } = JSON.parse(event.body);

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`, // secure env var
      },
      body: JSON.stringify({
        model: "gpt-4o-mini", // or "gpt-5" if your account allows
        messages: [{ role: "user", content: message }],
      }),
    });

    const data = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify({ reply: data.choices[0].message.content }),
    };
  } catch (error) {
    return { statusCode: 500, body: JSON.stringify({ error: error.message }) };
  }
}
