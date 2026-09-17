import { motion, useReducedMotion } from 'motion/react'

export default function AnimatedContent({ children, className = '', delay = 0 }) {
  const reduceMotion = useReducedMotion()
  return <motion.div className={className} initial={reduceMotion ? false : { opacity: 0, y: 8 }} animate={reduceMotion ? undefined : { opacity: 1, y: 0 }} transition={reduceMotion ? undefined : { duration: 0.38, delay, ease: [0.22, 1, 0.36, 1] }}>{children}</motion.div>
}
