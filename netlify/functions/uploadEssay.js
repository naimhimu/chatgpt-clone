import { createWorker } from "tesseract.js";
import formidable from "formidable";
import fs from "fs";
import fetch from "node-fetch";

export async function handler(event, context) {
  try {
    // Parse multipart/form-data
    const form = new formidable.IncomingForm();
    const data = await new Promise((resolve, reject) => {
      form.parse(event, (err, fields, files) => {
        if (err) reject(err);
        else resolve({ fields, files });
      });
    });

    const filePath = data.files.file.filepath;
    let essayText = "";

    // If PDF or TXT, read content (basic example)
    if (filePath.endsWith(".txt")) {
      essayText = fs.readFileSync(filePath, "utf-8");
    } else {
      // Assume image, run OCR
      const worker = await createWorker();
      await worker.load();
      await worker.loadLanguage("eng");
      await worker.initialize("eng");
      const {
        data: { text },
      } = await worker.recognize(filePath);
      essayText = text;
      await worker.terminate();
    }

    // Call OpenAI API for grading
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "user",
            content: `Please grade this essay and provide feedback:\n\n${essayText}`,
          },
        ],
      }),
    });

    const dataRes = await response.json();
    return {
      statusCode: 200,
      body: JSON.stringify({ result: dataRes.choices[0].message.content }),
    };
  } catch (err) {
    console.error(err);
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
}
