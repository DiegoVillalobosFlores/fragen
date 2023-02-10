import styles from './Home.module.scss'
import {Cormorant as Font} from "@next/font/google";
import SessionPreview from "@/components/SessionPreview/SessionPreview";
import HomeTitle from "@/components/Home/HomeTitle";
import HomeSubtitle from "@/components/Home/HomeSubtitle";
import HomeSubtitleContainer from "@/components/Home/HomeSubtitleContainer";
import Session from "@/types/Session";
import dayjs from "dayjs";
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/de'
import HomeButtons from "@/components/Home/HomeButtons";
dayjs.extend(relativeTime)
dayjs.locale('de')

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
        <HomeSubtitle>Sitzung von Heute:</HomeSubtitle>
        <SessionPreview>
          {currentSession === null && 'Keine Sitzung gefunden'}
          {currentSessionQuestions.length === 0 && 'Keine Fragen gestellt'}
          {currentSession !== null && currentSessionQuestions.map(question => (
            <div key={question}>
              {question}
            </div>
          ))}
          {currentSession && (
            <div>Sitzung endet {dayjs.unix(Number(currentSession.closesOn)).fromNow()}</div>
          )}
        </SessionPreview>
      </HomeSubtitleContainer>
      <HomeButtons/>
    </div>
  )
}
