import {ReactNode} from 'react'
import styles from './LayoutSide.module.scss'

type Props = {
  children: ReactNode
}

export default function LayoutSide({children}: Props) {
  return (
    <aside className={styles.root}>
      {children}
    </aside>
  )
}
