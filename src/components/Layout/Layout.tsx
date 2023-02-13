import {ReactNode} from 'react'
import styles from './Layout.module.scss'
import LayoutTitle from "@/components/Layout/LayoutTitle";
import LayoutMain from "@/components/Layout/LayoutMain";
import LayoutSide from "@/components/Layout/LayoutSide";

type Props = {
  children: ReactNode
}

export default function Layout({children}: Props) {
  return (
    <div className={styles.root}>
      {children}
    </div>
  )
}

Layout.Title = LayoutTitle
Layout.Main = LayoutMain
Layout.Side = LayoutSide
