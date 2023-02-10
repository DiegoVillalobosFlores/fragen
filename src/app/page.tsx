import Home from "@/components/Home/Home";
import RedisInstance from "@/clients/redis";
import RedisSessionsService from "@/services/redis/sessions";
import {redirect} from "next/navigation";
import {Graph} from "redis";
import {FRAGEN_GRAPH_NAME} from "@/utils/variables";

type Props = {
  searchParams: {
    newSession: string
  }
}

const redis = await RedisInstance();
const graph = new Graph(redis, FRAGEN_GRAPH_NAME)
const sessionsService = RedisSessionsService(redis, graph)

export default async function HomePage({searchParams}: Props) {
  if(searchParams.newSession === 'true') {
    const createdSession = await sessionsService.createSession()
    if(createdSession) redirect(`/sessions/${createdSession.id}`)
  }
  const actualSession = await sessionsService.getLastSession();
  return (<Home currentSession={actualSession} currentSessionQuestions={[]}/>)
}
