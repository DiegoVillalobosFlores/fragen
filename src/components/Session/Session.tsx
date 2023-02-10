import styles from './Session.module.scss'
import SessionType from "@/types/Session";
import QuestionType from "@/types/Question";
import Question from "@/components/Question/Question";
import SessionTextInput from "@/components/Session/SessionTextInput";

type Props = {
  session: SessionType,
	questions: Array<QuestionType>
}

export default function Session({session, questions}: Props) {
  return (
    <div className={styles.root}>
	    {session.id}
      {questions.map(question => <Question key={question.id} question={question}/>)}
      <SessionTextInput sessionId={session.id}/>
    </div>
  )
}
