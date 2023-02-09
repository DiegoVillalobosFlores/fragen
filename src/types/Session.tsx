import {z} from "zod";
import {sessionSchema} from "@/services/redis/sessions";

type Session = z.infer<typeof sessionSchema>

export default Session
