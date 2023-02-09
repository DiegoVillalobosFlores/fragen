import styles from './Home.module.scss'
import {Cormorant as Font} from "@next/font/google";
import {Button} from "@/components/Button";
import Link from "next/link";
import SessionPreview from "@/components/SessionPreview/SessionPreview";
import HomeTitle from "@/components/Home/HomeTitle";
import HomeSubtitle from "@/components/Home/HomeSubtitle";
import HomeSubtitleContainer from "@/components/Home/HomeSubtitleContainer";
import Session from "@/types/Session";
import dayjs from "dayjs";
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime)

const homeFont = Font({
  subsets: ['latin'],
  display: 'optional'
})

type Props = {
  currentSession: Session | null
  currentSessionQuestions: Array<string>
}

export default function Home({currentSession, currentSessionQuestions}: Props) {
  return (
    <div className={`${styles.root} ${homeFont.className}`}>
	    <HomeTitle>Willkommen zu Fragen.</HomeTitle>
      <HomeSubtitleContainer>
        <HomeSubtitle>Session von Heute:</HomeSubtitle>
        <SessionPreview>
          {currentSession === null && 'Keine Session gefunden'}
          {currentSessionQuestions.length === 0 && 'Keine Fragen abgestellt'}
          {currentSession !== null && currentSessionQuestions.map(question => (
            <div key={question}>
              {question}
            </div>
          ))}
          {currentSession && (
            <div>Session endet am: {dayjs(currentSession.closesOn).fromNow()}</div>
          )}
        </SessionPreview>
      </HomeSubtitleContainer>
      <Button>
        <Link href={'/?newSession=true'}>Neue Session anfangen</Link>
      </Button>
      <Button><Link href={'/sessions'}/> Zur alle Sessionen</Button>
    </div>
  )
}
