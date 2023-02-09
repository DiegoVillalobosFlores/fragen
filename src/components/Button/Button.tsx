'use client'

import {ReactNode} from "react";
import {motion, useAnimationControls} from "framer-motion";
import styles from './Button.module.scss'
import '@radix-ui/colors/amberDark.css'
import '@radix-ui/colors/amberDark.css'

type Props = {
  children: ReactNode;
  onClick?: () => void;
}

export default function Button({children, onClick}: Props) {
  const animationControls = useAnimationControls();
  return (
    <motion.button
      layout
      onHoverStart={() => animationControls.start({width: '120%'})}
      onHoverEnd={() => animationControls.start({width: '25%'})}
      whileHover={{fontSize: '20px'}}
      whileTap={{ scale: 0.9 }}
      className={`${styles.root} dark-theme`}
      onClick={onClick}
    >
      {children}
      <motion.div animate={animationControls} className={styles.underline}/>
    </motion.button>
  )
}