// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type {NextApiRequest, NextApiResponse} from 'next'
import RedisInstance from "@/clients/redis";
import RedisSessionsService from "@/services/redis/sessions";
import {Graph} from "redis";
import {FRAGEN_GRAPH_NAME} from "@/utils/variables";
import Session from "@/types/Session";

const redis = await RedisInstance();
const graph = new Graph(redis, FRAGEN_GRAPH_NAME)
const sessionsService = RedisSessionsService(redis, graph)

type Data = {
  result: Session
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const result = await sessionsService.createSession()
  res.status(200).json({result})
}
