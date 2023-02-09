import {ReactNode} from 'react'
import styles from './HomeSubtitleContainer.module.scss'

type Props = {
  children: ReactNode
}

export default function HomeSubtitleContainer({children}: Props) {
  return (
    <div className={styles.root}>
      {children}
    </div>
  )
}
