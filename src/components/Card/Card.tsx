'use client'

import styles from './Card.module.scss'
import {ReactNode} from "react";
import '@radix-ui/colors/crimsonDark.css'

type Props = {
  children: ReactNode
}

export default function Card({children}: Props) {
  return (
    <div className={`${styles.root} dark-theme`}>
      {children}
    </div>
  )
}