import Home from "@/components/Home/Home";
import RedisInstance from "@/clients/redis";
import RedisSessionsService from "@/services/redis/sessions";
import {redirect} from "next/navigation";

type Props = {
  searchParams: {
    newSession: string
  }
}

const redis = await RedisInstance();
const sessionsService = RedisSessionsService(redis)

export default async function HomePage({searchParams}: Props) {
  if(searchParams.newSession === 'true') {
    const createdSession = await sessionsService.createSession()
    if(createdSession) redirect(`/sessions/${createdSession.id}`)
  }
  const actualSession = await sessionsService.getLastSession();
  return (<Home currentSession={actualSession} currentSessionQuestions={[]}/>)
}
