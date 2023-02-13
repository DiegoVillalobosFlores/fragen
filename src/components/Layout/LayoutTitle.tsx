import {ReactNode} from 'react'
import styles from './LayoutTitle.module.scss'

type Props = {
  children: ReactNode
}

export default function LayoutTitle({children}: Props) {
  return (
		<header>
			<h1 className={styles.root}>
				{children}
			</h1>
		</header>
  )
}
