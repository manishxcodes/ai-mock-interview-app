import { FieldValue, Timestamp } from "firebase/firestore";
import { z } from "zod"
export interface User {
    id: string;
    name: string;
    email: string;
    imageUrl: string;
    createdAt: Timestamp | FieldValue;
    updatedAt: Timestamp | FieldValue;
}

export interface Interview {
    id: string;
    position: string;
    description: string;
    experience: number;
    userId: string;
    techStack: string;
    questions: {
        question: string;
        answer: string;
    }[];
    createdAt: Timestamp;
    updatedAt: Timestamp;
}

export interface UserAnswer {
  question: string;
  correct_answer: string;
  user_answer: string;
  feedback: string;
  rating: number;
}

export interface UserAnswers {
  userId: string;
  interviewId: string;
  answers: UserAnswer[];
  createdAt: Timestamp;
  updatedAt: Timestamp;
}


export const formSchema = z.object({
    position: z
      .string()
      .min(1, "Position is required")
      .max(100, "Position must be 100 characters or less"),
    description: z.string().min(10, "Description is required"),
    experience: z.coerce
      .number()
      .min(0, "Experience cannot be empty or negative"),
    techStack: z.string().min(1, "Tech stack must be at least a character"),
  });
  
  export type FormData = z.infer<typeof formSchema>;