import RedisSessionsService from "@/services/redis/sessions";

type SessionsService = Awaited<ReturnType<typeof RedisSessionsService>>

export default SessionsService
