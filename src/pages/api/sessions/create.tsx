// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type {NextApiRequest, NextApiResponse} from 'next'
import RedisInstance from "@/clients/redis";
import RedisSessionsService from "@/services/redis/sessions";

const redis = await RedisInstance();
const sessionsService = RedisSessionsService(redis)

type Data = {
  id: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const result = await sessionsService.createSession()
  res.status(200).json({id: result})
}
