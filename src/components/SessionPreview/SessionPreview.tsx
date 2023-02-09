'use client'

import {ReactNode} from 'react'
import {motion, useAnimationControls} from "framer-motion";
import styles from './SessionPreview.module.scss'

type Props = {
  children: ReactNode
}

export default function SessionPreview({children}: Props) {
  const topCornerControls = useAnimationControls();
  const bottomCornerControls = useAnimationControls();

  const widthVariants = {
    hoverStart: {
      width: 40,
      height: 40
    },
    hoverEnd: {
      width: 20,
      height: 20
    }
  }

  return (
    <motion.div
      onHoverStart={() => {
        topCornerControls.start({...widthVariants.hoverStart, marginRight: -20})
        bottomCornerControls.start({...widthVariants.hoverStart, marginLeft: -20})
      }}
      onHoverEnd={() => {
        topCornerControls.start({...widthVariants.hoverEnd, marginRight: 0})
        bottomCornerControls.start({...widthVariants.hoverEnd, marginLeft: 0})
      }}
      className={`${styles.root} dark-theme`}
    >
      <motion.div transition={{bounce: 0}} animate={topCornerControls} className={styles.topCorner}/>
      <motion.div transition={{bounce: 0}} className={styles.childrenContainer}>
        {children}
      </motion.div>
      <motion.div transition={{bounce: 0}} animate={bottomCornerControls} className={styles.bottomCorner}/>
    </motion.div>
  )
}
