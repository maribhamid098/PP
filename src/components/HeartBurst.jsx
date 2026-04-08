import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// Tap anywhere to spawn floating hearts
export default function HeartBurst() {
  const [hearts, setHearts] = useState([])

  useEffect(() => {
    const spawn = (e) => {
      const clientX = e.touches ? e.touches[0].clientX : e.clientX
      const clientY = e.touches ? e.touches[0].clientY : e.clientY
      const id = Date.now() + Math.random()
      setHearts((h) => [...h, { id, x: clientX, y: clientY }])
      setTimeout(() => setHearts((h) => h.filter((hh) => hh.id !== id)), 1200)
    }
    window.addEventListener('click', spawn)
    window.addEventListener('touchstart', spawn, { passive: true })
    return () => {
      window.removeEventListener('click', spawn)
      window.removeEventListener('touchstart', spawn)
    }
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-40">
      <AnimatePresence>
        {hearts.map((h) => (
          <motion.div key={h.id}
            initial={{ x: h.x - 12, y: h.y - 12, scale: 0.4, opacity: 1 }}
            animate={{ y: h.y - 80, scale: 1.1, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
            className="absolute text-2xl select-none"
            style={{ color: ['#ff6b9d', '#ffb3c6', '#ff85a1', '#ffc2d4'][Math.floor(Math.random() * 4)] }}
          >
            ♡
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
