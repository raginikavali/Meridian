import { useEffect, useRef } from 'react'

export default function DotGrid({ className = '' }) {
  const canvasRef = useRef(null)
  useEffect(() => { const canvas = canvasRef.current; const host = canvas?.parentElement; if (!canvas || !host || window.matchMedia('(prefers-reduced-motion: reduce)').matches || window.innerWidth < 640) return; const ctx = canvas.getContext('2d'); let frame; const draw = time => { const rect = host.getBoundingClientRect(); const dpr = window.devicePixelRatio || 1; if (canvas.width !== rect.width * dpr) { canvas.width = rect.width * dpr; canvas.height = rect.height * dpr; canvas.style.width = `${rect.width}px`; canvas.style.height = `${rect.height}px`; ctx.scale(dpr, dpr) }; ctx.clearRect(0, 0, rect.width, rect.height); const gap = 22; for (let y = 10; y < rect.height; y += gap) for (let x = 10; x < rect.width; x += gap) { const pulse = (Math.sin(time / 1300 + x * 0.01 + y * 0.014) + 1) / 2; ctx.fillStyle = `rgba(245, 158, 11, ${0.04 + pulse * 0.035})`; ctx.beginPath(); ctx.arc(x, y, 1, 0, Math.PI * 2); ctx.fill() }; frame = requestAnimationFrame(draw) }; frame = requestAnimationFrame(draw); return () => cancelAnimationFrame(frame) }, [])
  return <canvas ref={canvasRef} className={`reactbits-dot-grid ${className}`} aria-hidden="true" />
}
