import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion'
import PageWrapper from '../components/PageWrapper'
import Particles from '../components/Particles'
import FloatingOrbs from '../components/FloatingOrbs'
import HeartBurst from '../components/HeartBurst'

const TAGLINE = 'for someone who means a lot…'

function useMagnetic(strength = 0.28) {
  const ref = useRef(null)
  const x = useMotionValue(0), y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 200, damping: 20 })
  const sy = useSpring(y, { stiffness: 200, damping: 20 })
  useEffect(() => {
    const el = ref.current; if (!el) return
    const move = (e) => {
      const rect = el.getBoundingClientRect()
      x.set((e.clientX - rect.left - rect.width / 2) * strength)
      y.set((e.clientY - rect.top - rect.height / 2) * strength)
    }
    const reset = () => { x.set(0); y.set(0) }
    el.addEventListener('mousemove', move)
    el.addEventListener('mouseleave', reset)
    return () => { el.removeEventListener('mousemove', move); el.removeEventListener('mouseleave', reset) }
  }, [x, y, strength])
  return { ref, x: sx, y: sy }
}

export default function Home() {
  const [typed, setTyped] = useState('')
  const [showBtn, setShowBtn] = useState(false)
  const [showHint, setShowHint] = useState(false)
  const navigate = useNavigate()
  const magnetic = useMagnetic()

  // Cursor glow (desktop)
  const cx = useMotionValue(-200), cy = useMotionValue(-200)
  const scx = useSpring(cx, { stiffness: 80, damping: 20 })
  const scy = useSpring(cy, { stiffness: 80, damping: 20 })
  useEffect(() => {
    const m = (e) => { cx.set(e.clientX - 160); cy.set(e.clientY - 160) }
    window.addEventListener('mousemove', m)
    return () => window.removeEventListener('mousemove', m)
  }, [cx, cy])

  // Typewriter
  useEffect(() => {
    let i = 0
    const t = setInterval(() => {
      if (i <= TAGLINE.length) { setTyped(TAGLINE.slice(0, i)); i++ }
      else { clearInterval(t); setTimeout(() => setShowBtn(true), 350) }
    }, 58)
    return () => clearInterval(t)
  }, [])

  useEffect(() => {
    const t = setTimeout(() => setShowHint(true), 8000)
    return () => clearTimeout(t)
  }, [])

  return (
    <PageWrapper
      className="relative flex flex-col items-center justify-center overflow-hidden noise"
      style={{ minHeight: '100svh', background: 'linear-gradient(145deg, #fff0f5 0%, #ffe4ef 50%, #ffd6e7 100%)' }}
    >
      <motion.div className="fixed pointer-events-none z-0 w-80 h-80 rounded-full hidden md:block"
        style={{ x: scx, y: scy, background: 'radial-gradient(circle, rgba(255,107,157,0.14) 0%, transparent 70%)' }} />

      <Particles count={32} />
      <FloatingOrbs />
      <HeartBurst />

      <div className="relative z-10 flex flex-col items-center gap-6 px-6 text-center pt-20">
        {/* Orbit rings */}
        <div className="relative flex items-center justify-center mb-2">
          {[{ size: 'w-64 h-64 md:w-80 md:h-80', dur: 28, dir: 1, style: '1px dashed rgba(255,107,157,0.3)' },
            { size: 'w-48 h-48 md:w-64 md:h-64', dur: 18, dir: -1, style: '1px solid rgba(255,179,198,0.25)' },
            { size: 'w-32 h-32 md:w-48 md:h-48', dur: 40, dir: 1, style: '1px dotted rgba(255,133,161,0.2)' }
          ].map((ring, i) => (
            <motion.div key={i} animate={{ rotate: 360 * ring.dir }}
              transition={{ duration: ring.dur, repeat: Infinity, ease: 'linear' }}
              className={`absolute ${ring.size} rounded-full`} style={{ border: ring.style }} />
          ))}

          {/* Glow blob */}
          <motion.div animate={{ scale: [1, 1.12, 1], opacity: [0.35, 0.55, 0.35] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="absolute w-44 h-44 rounded-full"
            style={{ background: 'radial-gradient(circle, #ffb3c6 0%, transparent 70%)' }} />

          {/* Name */}
          <motion.h1
            initial={{ opacity: 0, scale: 0.75 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-gradient select-none relative z-10"
            style={{ fontSize: 'clamp(3.5rem, 16vw, 7.5rem)', letterSpacing: '0.1em', lineHeight: 1 }}
          >
            Muskaan
          </motion.h1>
        </div>

        {/* Tagline */}
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }}
          className="font-hand text-pink-400/80 min-h-[2rem] tracking-wide"
          style={{ fontSize: 'clamp(1rem, 4vw, 1.3rem)' }}
        >
          {typed}
          <motion.span animate={{ opacity: [1, 0, 1] }} transition={{ duration: 1, repeat: Infinity }}>|</motion.span>
        </motion.p>

        {/* CTA */}
        <AnimatePresence>
          {showBtn && (
            <motion.div ref={magnetic.ref} style={{ x: magnetic.x, y: magnetic.y }}
              initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }} className="mt-3"
            >
              <motion.button onClick={() => navigate('/memories')} whileTap={{ scale: 0.92 }}
                className="relative px-12 py-4 rounded-full text-sm tracking-widest uppercase text-white shimmer"
                style={{ background: 'linear-gradient(135deg, #ff85a1 0%, #ff6b9d 50%, #ff4d8d 100%)',
                  boxShadow: '0 8px 40px rgba(255,107,157,0.45), 0 2px 12px rgba(255,107,157,0.3)' }}
              >
                Begin ✦
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Scroll indicator */}
        <AnimatePresence>
          {showBtn && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}
              className="flex flex-col items-center gap-2 mt-6"
            >
              <p className="text-xs text-pink-300/60 tracking-widest uppercase">scroll to explore</p>
              <motion.div animate={{ y: [0, 7, 0] }} transition={{ duration: 1.6, repeat: Infinity }}
                className="w-px h-8" style={{ background: 'linear-gradient(to bottom, #ffb3c6, transparent)' }} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Easter egg dot */}
      <motion.div onClick={() => navigate('/secret-garden')}
        className="fixed bottom-24 left-5 w-3 h-3 rounded-full cursor-pointer z-50"
        style={{ background: 'rgba(255,179,198,0.25)' }}
        whileHover={{ scale: 3.5, background: 'rgba(255,107,157,0.5)' }}
        whileTap={{ scale: 0.7 }} title="" />

      <AnimatePresence>
        {showHint && (
          <motion.p initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            className="fixed bottom-10 text-xs text-pink-300/50 tracking-widest z-10 text-center px-4"
          >
            some things are hidden — look closely ✦
          </motion.p>
        )}
      </AnimatePresence>
    </PageWrapper>
  )
}
