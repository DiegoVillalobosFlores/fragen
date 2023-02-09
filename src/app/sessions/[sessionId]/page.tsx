import RedisInstance from "@/clients/redis";
import RedisSessionsService from "@/services/redis/sessions";

type Props = {
  params: {
    sessionId: string
  }
}

const redis = await RedisInstance();
const sessionsService = RedisSessionsService(redis)

export default async function SessionPage({params}: Props) {
  const session = await sessionsService.getSession(params.sessionId)
  console.log({session})
  return (
    <div>

    </div>
  )
}