import {RedisClient} from "@/clients/redis";
import dayjs from "dayjs";
import {z} from "zod";
import Session from "@/types/Session";

const SESSION_PREFIX = 'SESSIONS'

export const keys = {
  sessions: `${SESSION_PREFIX}:ZSET`,
  streams: `${SESSION_PREFIX}:STREAM`,
  session: (id: string) => `${SESSION_PREFIX}:${id}:JSON`
}

export const sessionSchema = z.object({
  id: z.string(),
  isClosed: z.boolean(),
  createdAt: z.number(),
  closesOn: z.number()
}).default(() => {
  const date = dayjs();
  const id = date.format('DD-MM-YYYY:hh')
  return {
    id,
    isClosed: false,
    createdAt: date.unix(),
    closesOn: dayjs().add(1, 'day').unix()
  }
})

export default function RedisSessionsService(
  redis: RedisClient
) {
  return {
    createSession: async (): Promise<Session> => {
      const defaultSession = sessionSchema.parse(undefined);
      const score = defaultSession.createdAt;
      const member = await redis.zScore(keys.sessions, defaultSession.id)
      if(member) return defaultSession
      await redis.zAdd(keys.sessions, [{value: defaultSession.id, score}])
      await redis.json.set(keys.session(defaultSession.id), '$', defaultSession)
      return defaultSession
    },
    getLastSession: async (): Promise<Session | null> => {
      const lastSessions = await redis.zRange(keys.sessions, 0, -1, {REV: true})
      if(lastSessions.length === 0) return null

      const lastSessionId = lastSessions.at(0);
      if(!lastSessionId) return null

      const lastSession = await redis.json.get(keys.session(lastSessionId))
      return lastSession as Session
    },
    getSession: async (id: string): Promise<Session | null> => {
      sessionSchema.parse({id})
      const session = await redis.json.get(keys.session(id))
      return session as Session
    }
  }
}