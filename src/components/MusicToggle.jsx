import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLocation } from 'react-router-dom'

export default function MusicToggle() {
  const [playing, setPlaying] = useState(false)
  const [showLabel, setShowLabel] = useState(false)
  const audioRef = useRef(null)
  const location = useLocation()
  const isHidden = location.pathname === '/secret-garden'

  useEffect(() => {
    audioRef.current = new Audio('https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3')
    audioRef.current.loop = true
    audioRef.current.volume = 0.15
    return () => audioRef.current?.pause()
  }, [])

  const toggle = () => {
    if (playing) { audioRef.current.pause() }
    else { audioRef.current.play().catch(() => {}) }
    setPlaying(!playing)
    setShowLabel(true)
    setTimeout(() => setShowLabel(false), 2000)
  }

  return (
    <div className="fixed z-50" style={{ bottom: isHidden ? '1.5rem' : '5.5rem', right: '1.5rem' }}>
      <AnimatePresence>
        {showLabel && (
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            className="absolute right-14 top-1/2 -translate-y-1/2 text-xs text-stone-400 tracking-widest whitespace-nowrap"
          >
            {playing ? 'music on' : 'music off'}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={toggle}
        whileTap={{ scale: 0.88 }}
        className="w-11 h-11 rounded-full flex items-center justify-center text-white text-base shadow-lg"
        style={{
          background: playing
            ? 'linear-gradient(135deg, #f4a7b9, #c084fc)'
            : 'rgba(255,255,255,0.5)',
          backdropFilter: 'blur(12px)',
          border: '1px solid rgba(255,255,255,0.6)',
          color: playing ? 'white' : '#a8a29e',
          boxShadow: playing ? '0 4px 20px rgba(244,167,185,0.4)' : '0 2px 12px rgba(0,0,0,0.08)',
        }}
        title={playing ? 'Pause music' : 'Play music'}
      >
        {/* Animated bars when playing */}
        {playing ? (
          <div className="flex items-end gap-0.5 h-4">
            {[1, 2, 3].map((b) => (
              <motion.div
                key={b}
                animate={{ height: ['40%', '100%', '60%', '80%', '40%'] }}
                transition={{ duration: 0.8, repeat: Infinity, delay: b * 0.15, ease: 'easeInOut' }}
                className="w-0.5 bg-white rounded-full"
                style={{ minHeight: 2 }}
              />
            ))}
          </div>
        ) : (
          <span>♪</span>
        )}
      </motion.button>
    </div>
  )
}
