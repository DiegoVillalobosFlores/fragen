'use client'

import {AnimatePresence, motion} from "framer-motion";
import {motionVariables} from "@/utils/variables";
import Question from "@/types/Question";

type Props = {
  questions: Array<Question>
}

export default function SessionPreviewQuestions({questions}: Props) {
  return (
		<AnimatePresence>
			<motion.div variants={motionVariables.staggeredChildren.container} initial={'hidden'} animate={'show'}>
				{questions.slice(0, 3).map(question => (
					<motion.div
						key={question.id}
						transition={{bounce: 0}}
						whileHover={{x: '10%'}}
						variants={motionVariables.staggeredChildren.child}
					>
						{question.question}
					</motion.div>
				))}
				{questions.length > 2 && (
					<motion.div variants={motionVariables.staggeredChildren.child}>. . . und {questions.length} mehr</motion.div>
				)}
			</motion.div>
		</AnimatePresence>
  )
}
