import SessionPreviewContainer from "@/components/SessionPreview/SessionPreviewContainer";
import Session from "@/types/Session";
import RedisInstance from "@/clients/redis";
import RedisSessionsService from "@/services/redis/sessions";
import RedisQuestionsService from "@/services/redis/questions";
import Link from "next/link";
import dayjs from "dayjs";
import SessionPreviewQuestions from "@/components/SessionPreview/SessionPreviewQuestions";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime)

type Props = {
  session: Session
}

const redis = await RedisInstance();
const sessionsService = RedisSessionsService(redis);
const questionsService = RedisQuestionsService(redis, sessionsService)

export default async function SessionPreview({session}: Props) {
  console.time('questions')
  const sessionQuestions = await questionsService.getQuestions(session.id);
  console.timeEnd('questions')
  return (
    <SessionPreviewContainer>
      <Link href={`/sessions/${session.id}/`}>
        {sessionQuestions.length === 0 && 'Keine Fragen gestellt'}
        <SessionPreviewQuestions questions={sessionQuestions}/>
        <br/>
        <div>Sitzung endet {dayjs.unix(Number(session.closesOn)).fromNow()}</div>
      </Link>
    </SessionPreviewContainer>
  )
}
