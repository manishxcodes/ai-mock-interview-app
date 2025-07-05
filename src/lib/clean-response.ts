import { toast } from "sonner";
import { chatSession } from "./gen-ai";

interface generateReviewProps {
    question: string 
    answer: string
    user_answer: string
}

interface AIResponse {
    ratings: number;
    feedback: string;
}

export const cleanJsonResponse = (responseText: string) => {
    try {
      let cleanText = responseText.trim();
  
      // Remove ```json ... ``` code block
      cleanText = cleanText.replace(/```json|```/g, "");
  
      // Remove any leftover markdown symbols
      cleanText = cleanText.replace(/(\*\*|\*|\\n)/g, " ");
  
      // Remove unexpected line breaks inside JSON
      cleanText = cleanText.replace(/\n/g, " ");
  
      // Replace smart quotes (“ ” ‘ ’) with normal quotes
      cleanText = cleanText.replace(/[“”‘’]/g, '"');
  
      // Parse the clean text
      return JSON.parse(cleanText);
    } catch (error) {
      throw new Error("Invalid JSON format: " + (error as Error)?.message);
    }
};
  
  

export const generateReview = async({question, answer, user_answer}: generateReviewProps) => {

    const prompt = `
        Question: "${question}"
        User Answer: "${user_answer}"
        Correct Answer: "${answer}"

        Please do the following:
        1. Compare the user's answer to the correct answer.
        2. Give a rating from 1 to 10 (only an integer, no explanation).
        3. Give detailed, constructive feedback that is at least **5-8 sentences long**.
        4.Also provide an **example of an improved answer** (keep it short, 3-5 sentences).

        Important:
        - Return only a VALID JSON object with two fields: "ratings" (number) and "feedback" (string).
        - Do NOT include any markdown formatting like **bold**, *, #, etc.
        - Do NOT add extra text or explanation outside the JSON.
        - Ensure there are NO line breaks inside the feedback text; use "\\n" if you need a new line.


        - Be professional, but encouraging.
        - **DO NOT** include any markdown formatting (no *, no **, no \`\`\`).
        - **ONLY** return a raw JSON object like this: 
        {
        "ratings": (a number between 1 and 10),
        "feedback": (a long string of feedback, no markdown)
        }
        Important: DO NOT add any extra text outside the JSON.
        `;
    try {
        const aiResponse = await chatSession.sendMessage(prompt);
        const cleanResponse: AIResponse = cleanJsonResponse(aiResponse.response.text());
        return cleanResponse;

    } catch (err) {
        //console.error("error occurred while generating feedback" ,{details: err});
        toast.error("Error", {
          description: "An error occurred while generating feedback.",
        });
    } 
};