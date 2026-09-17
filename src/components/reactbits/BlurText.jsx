import { motion, useInView } from 'motion/react'
import { useRef } from 'react'

export default function BlurText({ text, className = '', delay = 80, stepDuration = 0.42, animateBy = 'words', direction = 'top' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.1 })
  const units = animateBy === 'letters' ? text.split('') : text.split(' ')
  return <motion.span ref={ref} className={className} aria-label={text} initial="hidden" animate={inView ? 'visible' : 'hidden'} variants={{ visible: { transition: { staggerChildren: delay / 1000 } } }}>{units.map((unit, index) => <motion.span key={`${unit}-${index}`} className="reactbits-blur-unit" variants={{ hidden: { opacity: 0, filter: 'blur(10px)', y: direction === 'top' ? -8 : 8 }, visible: { opacity: 1, filter: 'blur(0px)', y: 0, transition: { duration: stepDuration, ease: [0.22, 1, 0.36, 1] } } }}>{unit}{animateBy === 'words' && index < units.length - 1 ? ' ' : ''}</motion.span>)}</motion.span>
}
