'use client'

import {useState} from 'react'
import styles from './SessionTextInput.module.scss'
import {Button} from "@/components/Button";
import Session from "@/types/Session";
import {AnimatePresence} from "framer-motion";
import {motion} from "framer-motion";
import {useRouter} from "next/navigation";

type Props = {
  sessionId: Session["id"]
}

export default function SessionTextInput({sessionId}: Props) {
	const [questionText, setQuestionText] = useState('');
	const [buttonState, setButtonState] = useState<'button' | 'loading' | 'done'>('button')
	const router = useRouter();

	const handleClick = () => {
		setButtonState('loading')
		fetch(`/api/sessions/${sessionId}/questions/create`, {
			method: 'POST',
			body: JSON.stringify({questionText})
		})
			.then(() => {
				setButtonState('done')
				router.refresh()
			})
	}

	const handleAnimationEnd = (definition: string) => {
		console.log(definition)
	}

  return (
		<motion.div layout>
			<input className={styles.root} value={questionText} onChange={e => setQuestionText(e.target.value)}/>
			<AnimatePresence>
				{buttonState === 'button' && (
					<motion.div
						layoutId={'button'}
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
					>
						<Button onClick={handleClick}>Frage stelle</Button>
					</motion.div>
				)}
				{/*{buttonState === 'loading' && (*/}
				{/*	<motion.div layoutId={'button'} animate={{rotate: 90, transition: {duration: 0.5, repeatType: 'loop'}}}>*/}
				{/*		¿?*/}
				{/*	</motion.div>*/}
				{/*)}*/}
				{buttonState === 'done' && (
					<motion.div
						layoutId={'button'}
						// initial={{scale: 0}}
						animate={{scale: 1.1}}
						// exit={{scale: 0}}
						// transition={{duration: 500}}
						onAnimationComplete={handleAnimationEnd}>
						✅
					</motion.div>
				)}
			</AnimatePresence>
		</motion.div>
  )
}
