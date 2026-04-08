import { useState, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function HoldReveal({ message, holdDuration = 1600 }) {
  const [progress, setProgress] = useState(0)
  const [revealed, setRevealed] = useState(false)
  const [pressing, setPressing] = useState(false)
  const interval = useRef(null)
  const startTime = useRef(null)

  const start = useCallback((e) => {
    e.preventDefault()
    if (revealed) return
    setPressing(true)
    startTime.current = Date.now()
    interval.current = setInterval(() => {
      const p = Math.min((Date.now() - startTime.current) / holdDuration, 1)
      setProgress(p)
      if (p >= 1) {
        clearInterval(interval.current)
        setRevealed(true)
        setPressing(false)
        if (navigator.vibrate) navigator.vibrate([40, 20, 60])
      }
    }, 16)
  }, [revealed, holdDuration])

  const stop = useCallback(() => {
    clearInterval(interval.current)
    setPressing(false)
    if (!revealed) setProgress(0)
  }, [revealed])

  const size = 100, r = 42, circ = 2 * Math.PI * r

  return (
    <AnimatePresence mode="wait">
      {!revealed ? (
        <motion.div key="hold" className="flex flex-col items-center gap-3 select-none">
          <motion.div
            onMouseDown={start} onMouseUp={stop} onMouseLeave={stop}
            onTouchStart={start} onTouchEnd={stop} onTouchCancel={stop}
            animate={pressing ? { scale: 0.93 } : { scale: 1 }}
            transition={{ type: 'spring', stiffness: 400, damping: 22 }}
            className="relative cursor-pointer" style={{ width: size, height: size, touchAction: 'none' }}
          >
            {pressing && [0, 0.2, 0.4].map((delay, i) => (
              <motion.div key={i}
                className="absolute inset-0 rounded-full border border-pink-300"
                animate={{ scale: [1, 1.8], opacity: [0.6, 0] }}
                transition={{ duration: 0.9, delay, repeat: Infinity }}
              />
            ))}
            <svg width={size} height={size} className="absolute inset-0" style={{ transform: 'rotate(-90deg)' }}>
              <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="rgba(255,179,198,0.25)" strokeWidth="3" />
              <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="url(#pg)" strokeWidth="3"
                strokeDasharray={circ} strokeDashoffset={circ * (1 - progress)} strokeLinecap="round" />
              <defs>
                <linearGradient id="pg" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#ffb3c6" />
                  <stop offset="100%" stopColor="#ff6b9d" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.span animate={pressing ? { scale: [1, 1.25, 1] } : {}}
                transition={{ duration: 0.5, repeat: Infinity }}
                className="text-3xl"
              >
                {progress > 0.5 ? '♥' : '♡'}
              </motion.span>
            </div>
          </motion.div>
          <p className="text-xs text-pink-300 tracking-widest">
            {pressing ? `${Math.round(progress * 100)}%` : 'hold to reveal'}
          </p>
        </motion.div>
      ) : (
        <motion.div key="revealed"
          initial={{ opacity: 0, scale: 0.85, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 200, damping: 20 }}
          className="glass glow p-8 text-center max-w-sm"
        >
          <motion.div animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 0.5 }} className="text-3xl mb-4">♥</motion.div>
          <p className="font-hand text-pink-800/80 leading-relaxed text-lg">{message}</p>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
