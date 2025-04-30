import { useState } from "react"
import { toast } from "sonner"
import { cleanJsonResponse } from "@/lib/clean-response"

interface generateReviewProps {
    question: string 
    answer: string
    user_answer: string
}

interface AIResponse {
    ratings: number;
    feedback: string;
}

export const useReviewAnswer = (chatSession: any) => {
    const[isAIGenerating, setIsAIGenerating] = useState(false);

    const generateReview = async({question, answer, user_answer}: generateReviewProps) => {
        setIsAIGenerating(true);

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
        console.log("prompt: ;",prompt)
        try {
            const aiResponse = await chatSession.sendMessage(prompt);
            const cleanResponse: AIResponse = cleanJsonResponse(aiResponse.response.text());
            return cleanResponse;

        } catch (err) {
            console.error("error occurred while generating feedback" ,{details: err});
            toast.error("Error", {
              description: "An error occurred while generating feedback.",
            });
        } finally {
            setIsAIGenerating(false);
        };
    };

    return { generateReview, isAIGenerating };
} 