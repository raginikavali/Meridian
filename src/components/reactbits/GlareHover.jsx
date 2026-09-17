import { motion, useReducedMotion } from 'motion/react'

export default function GlareHover({ children, className = '', as = 'div' }) {
  const reduceMotion = useReducedMotion()
  const Component = motion[as] || motion.div
  return <Component className={`reactbits-glare ${className}`} whileHover={reduceMotion ? undefined : { y: -2 }} transition={{ type: 'spring', stiffness: 360, damping: 24 }}>{children}<span className="reactbits-glare-sheen" aria-hidden="true" /></Component>
}
