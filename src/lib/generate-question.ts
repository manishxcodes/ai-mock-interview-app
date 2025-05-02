import { FormData } from "@/types";
import { chatSession } from "./gen-ai";
import { toast } from "sonner";


const cleanAIResponse = (responseText: string) => {
    let cleanText = responseText.trim();
  
    // Remove markdown formatting
    cleanText = cleanText.replace(/```(json)?/g, "").replace(/`/g, "");
  
    // Fix smart quotes
    cleanText = cleanText
      .replace(/[“”]/g, '"') // smart double quotes
      .replace(/[‘’]/g, "'"); // smart single quotes
  
    // Attempt to extract valid JSON (first array found)
    const jsonArrayMatch = cleanText.match(/\[.*\]/s);
    if (!jsonArrayMatch) {
      throw new Error("No JSON array found in response");
    }
  
    cleanText = jsonArrayMatch[0];
  
    // Attempt to parse
    try {
      return JSON.parse(cleanText);
    } catch (error) {
      console.error("Failed to parse JSON:", cleanText);
      throw new Error("Invalid JSON format: " + (error as Error)?.message);
    }
  };
  

  // generate question & answer from AI
 export const generateAIQuestion = async(data: FormData) => {
    const prompt = `
    As an experienced prompt engineer, generate a JSON array containing 8 technical interview questions along with detailed answers based on the following job information. 
    
    IMPORTANT: The response must be a valid JSON array. Make sure all quotes, commas, and brackets are correctly placed.
    Return ONLY a raw JSON array, without Markdown formatting or escape characters.

    Format the array exactly like this:
    [
      { "question": "Question text here", "answer": "Answer text here" },
      { "question": "Another question", "answer": "Another answer" }
    ]
    
    Job Information:
    - Job Position: ${data?.position}
    - Job Description: ${data?.description}
    - Years of Experience Required: ${data?.experience}
    - Tech Stacks: ${data?.techStack}
    
    The questions should assess skills in ${data?.techStack} development and best practices, problem-solving, and experience handling complex requirements. Return only the JSON array with questions and answers.
    `;

    try {
        const aiResponse = await chatSession.sendMessage(prompt);
        const cleanedAIResponse = cleanAIResponse(aiResponse.response.text())
        console.log("cleanedAIResponse:", cleanAIResponse)
        return cleanedAIResponse;
    } catch (err) {
            console.error("error occurred while generating question" ,{details: err});
            toast.error("Error", {
              description: "An error occurred while generating question.",
            });
        }
  }