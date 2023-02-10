import styles from './Question.module.scss'
import QuestionType from "@/types/Question";

type Props = {
  question: QuestionType
}

export default function Question({question}: Props) {
  return (
    <div className={styles.root}>
      {question.question}
    </div>
  )
}
