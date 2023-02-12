import Sessions from "@/components/Sessions/Sessions";
import RedisInstance from "@/clients/redis";
import RedisSessionsService from "@/services/redis/sessions";

const redis = await RedisInstance();
const sessionService = RedisSessionsService(redis);

export default async function sessionsPage() {
  const sessions = await sessionService.getSessions()
  return (
    <Sessions sessions={sessions || []}/>
  )
}