'use client'

import styles from './HomeButtons.module.scss'
import {AnimatePresence, motion} from "framer-motion";
import {Button} from "@/components/Button";
import Link from "next/link";
import {motionVariables} from "@/utils/variables";

export default function HomeButtons() {
  return (
		<AnimatePresence>
			<motion.div variants={motionVariables.staggeredChildren.container} initial={'hidden'} animate={'show'} className={styles.root}>
				<motion.div variants={motionVariables.staggeredChildren.child}>
					<Button>
						<Link href={'/?newSession=true'}>Neue Sitzung anfangen</Link>
					</Button>
				</motion.div>
				<motion.div variants={motionVariables.staggeredChildren.child}>
					<Button><Link href={'/sessions'}> Zur alle Sitzungen</Link></Button>
				</motion.div>
			</motion.div>
		</AnimatePresence>
  )
}
