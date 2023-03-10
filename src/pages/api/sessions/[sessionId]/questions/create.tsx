// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type {NextApiRequest, NextApiResponse} from 'next'
import RedisInstance from "@/clients/redis";
import RedisSessionsService from "@/services/redis/sessions";
import RedisQuestionsService from "@/services/redis/questions";
import Question from "@/types/Question";

type Data = {
  result: Question
}

const redis = await RedisInstance();
const sessionsService = RedisSessionsService(redis)
const questionsService = RedisQuestionsService(redis, sessionsService)

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const {sessionId} = req.query as {sessionId: string}
  const {questionText} = JSON.parse(req.body)
  const result = await questionsService.createQuestion(sessionId, questionText)
  if(!result) return res.status(400).end()
  res.status(200).json({result})
}
