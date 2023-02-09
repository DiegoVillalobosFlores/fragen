import {ReactNode} from 'react'
import styles from './HomeTitle.module.scss'

type Props = {
  children: ReactNode
}

export default function HomeTitle({children}: Props) {
  return (
    <h1 className={styles.root}>
      {children}
    </h1>
  )
}
