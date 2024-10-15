import OpenAI from "openai";

export async function calculateComplexity(myFunction) {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const response = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [
      {
        role: "system",
        content:
          "What is the tyme complexity of this js function (write only complexity funtion, your response should be maximum 64 symbols)",
      },
      {
        role: "user",
        content: myFunction,
      },
    ],
    temperature: 0.7,
    max_tokens: 16,
    top_p: 1,
  });

  const complexity = response.choices[0].message.content.trim();
  return complexity;
}
