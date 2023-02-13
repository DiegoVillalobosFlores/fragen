import {ReactNode} from 'react'
import styles from './LayoutMain.module.scss'
import {Cormorant as Font} from "@next/font/google";

type Props = {
  children: ReactNode
}

const mainFont = Font({
	subsets: ['latin'],
	display: 'optional'
})

export default function LayoutMain({children}: Props) {
  return (
    <main className={`${styles.root} ${mainFont.className}`}>
      {children}
    </main>
  )
}
