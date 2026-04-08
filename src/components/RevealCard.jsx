import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function RevealCard({ front, back, icon = '✦', className = '' }) {
  const [revealed, setRevealed] = useState(false)
  const [ripple, setRipple] = useState(null)

  const handleClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = ((e.touches?.[0]?.clientX ?? e.clientX) - rect.left) / rect.width * 100
    const y = ((e.touches?.[0]?.clientY ?? e.clientY) - rect.top) / rect.height * 100
    setRipple({ x, y, id: Date.now() })
    setTimeout(() => setRipple(null), 600)
    setRevealed(!revealed)
    if (navigator.vibrate) navigator.vibrate(18)
  }

  return (
    <motion.div
      onClick={handleClick}
      whileTap={{ scale: 0.97 }}
      className={`glass glow-soft cursor-pointer select-none relative overflow-hidden ${className}`}
      style={{ minHeight: 130 }}
    >
      <AnimatePresence>
        {ripple && (
          <motion.div key={ripple.id}
            initial={{ scale: 0, opacity: 0.5 }} animate={{ scale: 5, opacity: 0 }}
            transition={{ duration: 0.55 }}
            className="absolute w-12 h-12 rounded-full pointer-events-none"
            style={{ left: `${ripple.x}%`, top: `${ripple.y}%`, transform: 'translate(-50%,-50%)',
              background: 'radial-gradient(circle, rgba(255,105,150,0.35) 0%, transparent 70%)' }}
          />
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {!revealed ? (
          <motion.div key="front"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, scale: 0.95 }}
            className="p-6 flex flex-col items-center gap-3 text-center"
          >
            <motion.span animate={{ rotate: [0, 6, -6, 0] }}
              transition={{ duration: 4, repeat: Infinity, delay: Math.random() * 2 }}
              className="text-3xl">{icon}</motion.span>
            <div className="text-pink-700/70 text-sm">{front}</div>
            <div className="flex items-center gap-1.5 text-xs text-pink-300">
              <motion.div animate={{ scale: [1, 1.4, 1] }} transition={{ duration: 1.4, repeat: Infinity }}
                className="w-1.5 h-1.5 rounded-full bg-pink-300" />
              tap to reveal
            </div>
          </motion.div>
        ) : (
          <motion.div key="back"
            initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="p-6 text-center"
          >
            <p className="font-hand text-pink-800/80 leading-relaxed text-base">{back}</p>
            <p className="text-xs text-pink-200 mt-3">tap to close</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
