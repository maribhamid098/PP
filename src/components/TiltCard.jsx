import { useRef } from 'react'
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion'

export default function TiltCard({ children, className = '', intensity = 10 }) {
  const ref = useRef(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [intensity, -intensity]), { stiffness: 200, damping: 25 })
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-intensity, intensity]), { stiffness: 200, damping: 25 })

  const handle = (cx, cy) => {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    x.set((cx - rect.left) / rect.width - 0.5)
    y.set((cy - rect.top) / rect.height - 0.5)
  }
  const reset = () => { x.set(0); y.set(0) }

  return (
    <motion.div ref={ref}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d', perspective: 800 }}
      onMouseMove={(e) => handle(e.clientX, e.clientY)}
      onMouseLeave={reset}
      onTouchMove={(e) => { e.preventDefault(); handle(e.touches[0].clientX, e.touches[0].clientY) }}
      onTouchEnd={reset}
      className={`relative ${className}`}
    >
      {children}
    </motion.div>
  )
}
