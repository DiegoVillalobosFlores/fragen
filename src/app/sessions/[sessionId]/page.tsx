import RedisInstance from "@/clients/redis";
import RedisSessionsService from "@/services/redis/sessions";
import RedisQuestionsService from "@/services/redis/questions";
import Session from "@/components/Session/Session";
import {notFound} from "next/navigation";

type Props = {
  params: {
    sessionId: string
  }
}

const redis = await RedisInstance();
const sessionsService = RedisSessionsService(redis)
const questionsService = RedisQuestionsService(redis, sessionsService)

export default async function SessionPage({params}: Props) {
  const session = await sessionsService.getSession(params.sessionId)
  if(session === null) notFound()
  const questions = await questionsService.getQuestions(params.sessionId)
  return (
    <Session session={session} questions={questions}/>
  )
}