'use client'

import styles from './HomeButtons.module.scss'
import {AnimatePresence, motion} from "framer-motion";
import {Button} from "@/components/Button";
import Link from "next/link";

const container = {
	hidden: {opacity: 0},
	show: {
		opacity: 1,
		transition: {
			staggerChildren: 0.4
		}
	}
}

const button = {
	hidden: { opacity: 0 },
	show: { opacity: 1 }
}

export default function HomeButtons() {
  return (
		<AnimatePresence>
			<motion.div variants={container} initial={'hidden'} animate={'show'} className={styles.root}>
				<motion.div variants={button}>
					<Button>
						<Link href={'/?newSession=true'}>Neue Sitzung anfangen</Link>
					</Button>
				</motion.div>
				<motion.div variants={button}>
					<Button><Link href={'/sessions'}> Zur alle Sitzungen</Link></Button>
				</motion.div>
			</motion.div>
		</AnimatePresence>
  )
}
