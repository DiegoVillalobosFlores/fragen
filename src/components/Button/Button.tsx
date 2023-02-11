'use client'

import {ReactNode} from "react";
import {motion, useAnimationControls} from "framer-motion";
import styles from './Button.module.scss'
import '@radix-ui/colors/amberDark.css'
import '@radix-ui/colors/amberDark.css'
import ButtonFont from "@/components/Button/ButtonFont";

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
      whileHover={{scale: 1.1}}
      whileTap={{ scale: 0.9 }}
      initial={{scale: 1, width: 'auto'}}
      exit={{scale: 1, width: 'auto'}}
      className={`${styles.root} dark-theme ${ButtonFont.className}`}
      onClick={onClick}
    >
      {children}
      <motion.div transition={{duration: 0.4}} animate={animationControls} className={styles.underline}/>
    </motion.button>
  )
}