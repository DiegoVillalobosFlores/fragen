import {RedisClient} from "@/clients/redis";
import {Graph} from "redis";
import {FRAGEN_GRAPH_NAME} from "@/utils/variables";
import Session from "@/types/Session";
import {z} from "zod";
import SessionsService from "@/types/SessionService";
import dayjs from "dayjs";
import Question from "@/types/Question";

export const questionSchema = z.object({
  id: z.string(),
  question: z.string(),
  createdAt: z.number(),
})

export default function RedisQuestionsService(redis: RedisClient, sessionsService: SessionsService) {
  const graph = new Graph(redis, FRAGEN_GRAPH_NAME)
  return {
    createQuestion: async (sessionId: Session["id"], questionText: string): Promise<Question | null> => {
      const session = sessionsService.getSession(sessionId)
      if(session === null) return null
      questionSchema.shape.question.parse(questionText)

      const date = dayjs();
      const question: Question = {
        id: date.unix().toString(),
        question: questionText,
        createdAt: date.unix()
      }

      await graph.query('MERGE (:Session {id: $sessionId})' +
        '-[:HAS_QUESTIONS]->' +
        '(:Question {' +
        'id: $id, ' +
        'question: $question, ' +
        'createdAt: $createdAt' +
        '})', {params: {sessionId, ...question}})

      return question
    },
    getQuestions: async (sessionId: Session["id"]): Promise<Array<Question>> => {
      const session = sessionsService.getSession(sessionId)
      if(session === null) return [];

      const questions = await graph.roQuery<Question>('MATCH (:Session {id: $sessionId})' +
        '-[:HAS_QUESTIONS]->' +
        '(q:Question) ' +
        'RETURN q.id as id, q.question as question, q.createdAt as createdAt', {params: {sessionId}})

      if(!questions.data) return []

      return questions.data
    }
  }
}