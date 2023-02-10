import RedisInstance from "@/clients/redis";
import RedisSessionsService from "@/services/redis/sessions";
import {Graph} from "redis";
import {FRAGEN_GRAPH_NAME} from "@/utils/variables";
import RedisQuestionsService from "@/services/redis/questions";
import Session from "@/components/Session/Session";
import {notFound} from "next/navigation";

type Props = {
  params: {
    sessionId: string
  }
}

const redis = await RedisInstance();
const graph = new Graph(redis, FRAGEN_GRAPH_NAME)
const sessionsService = RedisSessionsService(redis, graph)
const questionsService = RedisQuestionsService(redis, sessionsService)

export default async function SessionPage({params}: Props) {
  const session = await sessionsService.getSession(params.sessionId)
  if(session === null) notFound()
  const questions = await questionsService.getQuestions(params.sessionId)
  return (
    <Session session={session} questions={questions}/>
  )
}