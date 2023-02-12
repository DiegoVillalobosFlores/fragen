import styles from './Sessions.module.scss'
import Session from "@/types/Session";

type Props = {
  sessions?: Array<Session>
}

export default function Sessions({sessions}: Props) {
  return (
    <div className={styles.root}>
      {sessions && sessions.map(session => (
        <div key={session.id}>
          {session.id} {session.createdAt} {session.closesOn}
        </div>
      ))}
    </div>
  )
}
