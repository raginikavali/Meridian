import { motion } from 'motion/react'

export default function Stepper({ steps, current = 0 }) {
  return <div className="reactbits-stepper" aria-label="Order status timeline">{steps.map((step, index) => <div key={step} className="reactbits-step"><div className={`reactbits-step-dot ${index <= current ? 'is-complete' : ''}`}><motion.span layout="position" /></div><div><p className={index <= current ? 'text-text-primary font-medium capitalize' : 'text-text-tertiary capitalize'}>{step}</p>{index < steps.length - 1 && <div className="reactbits-step-line"><motion.span initial={false} animate={{ scaleY: index < current ? 1 : 0 }} transition={{ duration: 0.35 }} /></div>}</div></div>)}</div>
}
