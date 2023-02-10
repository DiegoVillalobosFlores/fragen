import {RedisClient} from "@/clients/redis";
import dayjs from "dayjs";
import {z} from "zod";
import Session from "@/types/Session";
import {Graph} from "redis";

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
  const id = date.unix().toString()
  return {
    id,
    isClosed: false,
    createdAt: date.unix(),
    closesOn: dayjs().add(1, 'day').unix()
  }
})

export default function RedisSessionsService(
  redis: RedisClient,
  graph: Graph
) {
  return {
    createSession: async (): Promise<Session> => {
      const defaultSession = sessionSchema.parse(undefined);
      const query = 'CREATE (:Session {' +
        'id: $id, ' +
        'isClosed: $isClosed, ' +
        'createdAt: $createdAt, ' +
        'closesOn: $closesOn})'
      await graph.query(query, {params: defaultSession})
      return defaultSession
    },
    getLastSession: async (): Promise<Session | null> => {
      const sessions = await graph.roQuery<Session>('MATCH (s:Session) ' +
        'WHERE s.createdAt > $dateRange ' +
        'RETURN s.id as id, s.isClosed as isClosed, s.createdAt as createdAt,s.closesOn as closesOn ' +
        'ORDER BY s.createdAt DESC ' +
        'LIMIT 1 ',
        {params: {dateRange: dayjs().subtract(1, 'day').unix()}}
      )
      if(!sessions.data || sessions.data.length === 0) return null
      return sessions.data[0]
    },
    getSession: async (id: string): Promise<Session | null> => {
      const session = await graph.roQuery<Session>('MATCH (s:Session {id: $id})' +
        ' RETURN s.id as id, s.isClosed as isClosed, s.createdAt as createdAt,s.closesOn as closesOn ', {params: {id}})
      if(!session.data || session.data.length === 0) return null
      return session.data[0]
    }
  }
}
