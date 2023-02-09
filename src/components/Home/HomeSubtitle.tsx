import {ReactNode} from 'react'
import styles from './HomeSubtitle.module.scss'

type Props = {
  children: ReactNode
}

export default function HomeSubtitle({children}: Props) {
  return (
    <h2 className={styles.root}>
      {children}
    </h2>
  )
}
