import { motion, useInView } from 'motion/react'
import { useEffect, useRef, useState } from 'react'

export default function CountUp({ to, from = 0, duration = 0.9, delay = 0, separator = ',', decimals = 0, className = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.25 })
  const [value, setValue] = useState(from)
  const numericTo = Number(to)
  useEffect(() => { if (!inView) return; let frame; const start = performance.now() + delay * 1000; const tick = now => { if (now < start) { frame = requestAnimationFrame(tick); return }; const progress = Math.min((now - start) / (duration * 1000), 1); const eased = 1 - Math.pow(1 - progress, 3); setValue(from + (numericTo - from) * eased); if (progress < 1) frame = requestAnimationFrame(tick) }; frame = requestAnimationFrame(tick); return () => cancelAnimationFrame(frame) }, [inView, from, numericTo, duration, delay])
  const formatted = value.toFixed(decimals).replace(/\B(?=(\d{3})+(?!\d))/g, separator)
  return <motion.span ref={ref} className={className} initial={{ opacity: 0.35 }} animate={inView ? { opacity: 1 } : { opacity: 0.35 }} transition={{ duration: 0.25 }}>{formatted}</motion.span>
}
