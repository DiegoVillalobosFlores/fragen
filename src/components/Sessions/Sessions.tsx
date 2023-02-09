import {ReactNode} from 'react'
import styles from './Sessions.module.scss'

type Props = {
  children: ReactNode
}

export default function Sessions({children}: Props) {
  return (
    <div className={styles.root}>
      {children}
    </div>
  )
}
