import styles from './Session.module.scss'
import SessionType from "@/types/Session";
import QuestionType from "@/types/Question";
import Question from "@/components/Question/Question";
import SessionTextInput from "@/components/Session/SessionTextInput";
import dayjs from "dayjs";
import 'dayjs/locale/de'
import Layout from "@/components/Layout/Layout";

dayjs.locale('de')

type Props = {
  session: SessionType,
	questions: Array<QuestionType>
}

export default function Session({session, questions}: Props) {
  return (
    <Layout>
      <Layout.Title>
        Sitzung am {dayjs.unix(Number(session.createdAt)).format('dddd D MMM YY')}
      </Layout.Title>
      <div className={styles.container}>
        <div>
          {questions.map(question => <Question key={question.id} question={question}/>)}
          <SessionTextInput sessionId={session.id}/>
        </div>
        <aside className={styles.side}>
          sidebar
        </aside>
      </div>
    </Layout>
  )
}
