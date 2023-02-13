import SessionPreview from "@/components/SessionPreview/SessionPreview";
import HomeSubtitle from "@/components/Home/HomeSubtitle";
import HomeSubtitleContainer from "@/components/Home/HomeSubtitleContainer";
import Session from "@/types/Session";
import dayjs from "dayjs";
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/de'
import HomeButtons from "@/components/Home/HomeButtons";
import Layout from "@/components/Layout/Layout";

dayjs.extend(relativeTime)
dayjs.locale('de')

type Props = {
  currentSession: Session | null
}

export default function Home({currentSession}: Props) {
  return (
    <Layout>
      <Layout.Title>Willkommen zu Fragen.</Layout.Title>
      <Layout.Main>
        <HomeSubtitleContainer>
          <HomeSubtitle>Sitzung von Heute:</HomeSubtitle>
          {/* @ts-expect-error Server Component */}
          {currentSession && <SessionPreview session={currentSession}/>}
        </HomeSubtitleContainer>
        <HomeButtons/>
      </Layout.Main>
      <Layout.Side>
        Fragen ist die Dienst die 100% anonymous ist
      </Layout.Side>
    </Layout>
  )
}
