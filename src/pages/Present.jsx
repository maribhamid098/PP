import { useState } from 'react'
import { motion, AnimatePresence, useMotionValue } from 'framer-motion'
import PageWrapper from '../components/PageWrapper'
import ScrollReveal from '../components/ScrollReveal'
import TiltCard from '../components/TiltCard'
import FloatingOrbs from '../components/FloatingOrbs'

const panels = [
  { trigger: 'Talking again', icon: '💬', content: "It's different now — lighter somehow. Like we both know more about what we're doing, even if we're still figuring it out." },
  { trigger: 'No pressure',   icon: '🌸', content: "There's no timeline here. No expectation. Just two people choosing to be present with each other." },
  { trigger: 'Patience',      icon: '🌷', content: "Some things take time to rebuild. That's okay. Good things usually do." },
  { trigger: 'Space',         icon: '🕊️', content: "You can take all the space you need. It won't change anything on my end." },
]

const thoughts = [
  'I notice the small things.',
  "I'm not in a hurry.",
  "You don't have to explain yourself.",
  "I'm just glad we're talking.",
  "Whatever this is — it's enough.",
  'You matter more than you know.',
  "I still find peace with you.",
]

function MoodSlider() {
  const x = useMotionValue(0)
  const [label, setLabel] = useState('how are you feeling?')
  const labels = ['overwhelmed', 'unsure', 'okay', 'good', 'really good']

  return (
    <div className="glass p-6">
      <p className="text-xs text-pink-300 tracking-widest uppercase mb-5 text-center">drag to answer</p>
      <div className="relative h-10 flex items-center mx-2">
        <div className="absolute inset-x-0 h-1.5 rounded-full"
          style={{ background: 'linear-gradient(90deg, #ffd6e7, #ffb3c6, #ff85a1, #ff6b9d)' }} />
        <motion.div drag="x" dragConstraints={{ left: 0, right: 0 }} dragElastic={0}
          onDrag={(_, info) => {
            const pct = Math.max(0, Math.min(1, (info.point.x - 48) / (window.innerWidth - 130)))
            setLabel(labels[Math.min(Math.floor(pct * labels.length), labels.length - 1)])
          }}
          whileTap={{ scale: 1.25 }}
          className="absolute w-9 h-9 rounded-full cursor-grab active:cursor-grabbing flex items-center justify-center text-white shadow-lg"
          style={{ x, background: 'linear-gradient(135deg,#ff85a1,#ff6b9d)',
            boxShadow: '0 4px 20px rgba(255,107,157,0.4)', touchAction: 'none', left: 'calc(50% - 18px)' }}
        >♡</motion.div>
      </div>
      <AnimatePresence mode="wait">
        <motion.p key={label} initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
          className="font-hand text-pink-600/70 text-center mt-5 text-xl">{label}</motion.p>
      </AnimatePresence>
    </div>
  )
}

function PanelCard({ panel }) {
  const [open, setOpen] = useState(false)
  return (
    <motion.div onClick={() => setOpen(!open)} whileTap={{ scale: 0.96 }}
      className="glass p-4 cursor-pointer h-full" style={{ minHeight: 115 }}
    >
      <motion.span animate={open ? { scale: 1.2, rotate: 10 } : { scale: 1, rotate: 0 }}
        transition={{ type: 'spring', stiffness: 300 }} className="text-2xl inline-block">{panel.icon}</motion.span>
      <p className="text-pink-700/70 text-sm font-medium mt-2">{panel.trigger}</p>
      <AnimatePresence>
        {open && (
          <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="font-hand text-pink-600/65 text-sm mt-2 leading-relaxed overflow-hidden"
          >{panel.content}</motion.p>
        )}
      </AnimatePresence>
      {!open && <p className="text-xs text-pink-200 mt-2">tap</p>}
    </motion.div>
  )
}

export default function Present() {
  const [activeThought, setActiveThought] = useState(null)
  const [idx, setIdx] = useState(0)
  const [taps, setTaps] = useState(0)

  const nextThought = () => {
    const next = (idx + 1) % thoughts.length
    setIdx(next); setActiveThought(thoughts[next]); setTaps(t => t + 1)
    if (navigator.vibrate) navigator.vibrate(25)
    setTimeout(() => setActiveThought(null), 3500)
  }

  return (
    <PageWrapper className="page-pad"
      style={{ background: 'linear-gradient(160deg, #fff0f5 0%, #ffe4ef 100%)', minHeight: '100svh' }}
    >
      <FloatingOrbs />
      <div className="relative z-10 max-w-lg mx-auto px-5 pt-24">

        <ScrollReveal>
          <div className="text-center mb-12">
            <p className="text-xs text-pink-300 tracking-widest uppercase mb-2">right now</p>
            <h2 className="font-display text-pink-700/80" style={{ fontSize: 'clamp(2.2rem, 9vw, 3.2rem)' }}>Present</h2>
            <p className="text-pink-400/60 text-sm mt-2 font-hand italic">"we're talking again… differently"</p>
          </div>
        </ScrollReveal>

        <ScrollReveal><div className="mb-8"><MoodSlider /></div></ScrollReveal>

        <div className="grid grid-cols-2 gap-3 mb-10">
          {panels.map((p, i) => (
            <ScrollReveal key={i}><TiltCard intensity={9}><PanelCard panel={p} /></TiltCard></ScrollReveal>
          ))}
        </div>

        {/* Thought orb */}
        <ScrollReveal>
          <div className="text-center mt-8">
            <p className="text-xs text-pink-300/60 tracking-widest uppercase mb-6">tap for a thought</p>
            <div className="relative inline-flex items-center justify-center">
              {[1, 1.4, 1.8].map((s, i) => (
                <motion.div key={i} animate={{ scale: [1, s, 1], opacity: [0.4, 0.15, 0.4] }}
                  transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.4 }}
                  className="absolute w-20 h-20 rounded-full"
                  style={{ background: 'radial-gradient(circle, rgba(255,107,157,0.25) 0%, transparent 70%)' }} />
              ))}
              <motion.button onClick={nextThought} whileTap={{ scale: 0.86 }}
                className="relative w-20 h-20 rounded-full flex items-center justify-center text-white text-2xl"
                style={{ background: 'linear-gradient(135deg,#ff85a1,#ff6b9d)',
                  boxShadow: '0 8px 36px rgba(255,107,157,0.45)' }}
              >
                <motion.span key={taps} initial={{ scale: 0.4, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: 'spring', stiffness: 400 }}>♡</motion.span>
              </motion.button>
            </div>

            <AnimatePresence>
              {activeThought && (
                <motion.div key={activeThought}
                  initial={{ opacity: 0, y: 14, scale: 0.94 }} animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.94 }}
                  transition={{ type: 'spring', stiffness: 280, damping: 24 }}
                  className="mt-6 glass px-7 py-4 inline-block"
                >
                  <p className="font-hand text-pink-700/75 text-xl">{activeThought}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <div className="text-center mt-16">
            <a href="/message" className="inline-flex items-center gap-2 text-sm text-pink-300 hover:text-pink-500 transition-colors tracking-widest">
              something I want to say
              <motion.span animate={{ x: [0, 5, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>→</motion.span>
            </a>
          </div>
        </ScrollReveal>
      </div>
    </PageWrapper>
  )
}
