import {z} from "zod";
import {questionSchema} from "@/services/redis/questions";

type Question = z.infer<typeof questionSchema>

export default Question
