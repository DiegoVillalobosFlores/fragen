'use client'

import {ReactNode} from 'react'
import styles from './SessionPreviewContainer.module.scss'
import dayjs from "dayjs";
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/de'
import {motion, useAnimationControls} from "framer-motion";
import {motionVariables} from "@/utils/variables";

dayjs.extend(relativeTime)
dayjs.locale('de')

type Props = {

  children: ReactNode
}

const widthVariants = motionVariables.growingCorners

export default function SessionPreviewContainer({children}: Props) {
	const topCornerControls = useAnimationControls();
	const bottomCornerControls = useAnimationControls();

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
