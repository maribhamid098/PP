import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import PageWrapper from '../components/PageWrapper'
import ScrollReveal from '../components/ScrollReveal'
import HoldReveal from '../components/HoldReveal'
import TiltCard from '../components/TiltCard'
import FloatingOrbs from '../components/FloatingOrbs'
import Confetti from 'react-confetti'
import { useWindowSize } from '../hooks/useWindowSize'

const messages = [
  { short: 'No rush',      icon: '🌸', full: "I don't want to rush anything. Whatever pace feels right for you — that's the right pace." },
  { short: 'Be yourself',  icon: '🌷', full: "I just want you to feel safe being yourself. Not a version of yourself that's performing or protecting — just you." },
  { short: 'No hiding',    icon: '🕊️', full: "You don't have to hide what you feel. Not around me. Whatever it is — it's okay." },
  { short: 'Always here',  icon: '♡',  full: "No matter what happens, no matter what this becomes — I'll always be here. That part doesn't change." },
  { short: 'You matter',   icon: '✦',  full: "Not because of what you do or how you show up — just because of who you are. That's enough." },
]

export default function Message() {
  const [active, setActive] = useState(null)
  const [read, setRead] = useState(new Set())
  const [confetti, setConfetti] = useState(false)
  const { width, height } = useWindowSize()

  const handleClick = (i) => {
    const opening = active !== i
    setActive(opening ? i : null)
    if (opening) {
      const next = new Set([...read, i])
      setRead(next)
      if (next.size === messages.length) {
        setTimeout(() => { setConfetti(true); setTimeout(() => setConfetti(false), 4500) }, 300)
      }
      if (navigator.vibrate) navigator.vibrate(18)
    }
  }

  return (
    <PageWrapper className="page-pad"
      style={{ background: 'linear-gradient(160deg, #fff0f5 0%, #ffe4ef 100%)', minHeight: '100svh' }}
    >
      {confetti && (
        <Confetti width={width} height={height} numberOfPieces={180}
          colors={['#ff6b9d', '#ffb3c6', '#ff85a1', '#ffc2d4', '#ffd6e7', '#ffe0eb']} recycle={false} />
      )}

      <FloatingOrbs />
      <div className="relative z-10 max-w-lg mx-auto px-5 pt-24">

        <ScrollReveal>
          <div className="text-center mb-12">
            <p className="text-xs text-pink-300 tracking-widest uppercase mb-2">from me to you</p>
            <h2 className="font-display text-pink-700/80" style={{ fontSize: 'clamp(2.2rem, 9vw, 3.2rem)' }}>
              A few things
            </h2>
            <div className="flex justify-center gap-2 mt-4">
              {messages.map((_, i) => (
                <motion.div key={i}
                  animate={read.has(i)
                    ? { background: 'linear-gradient(135deg,#ff85a1,#ff6b9d)', scale: 1.25 }
                    : { background: 'rgba(255,179,198,0.35)', scale: 1 }}
                  className="w-2 h-2 rounded-full"
                />
              ))}
            </div>
            <p className="text-pink-300/60 text-xs mt-2">{read.size}/{messages.length} opened</p>
          </div>
        </ScrollReveal>

        <div className="flex flex-col gap-3">
          {messages.map((msg, i) => (
            <ScrollReveal key={i}>
              <TiltCard intensity={active === i ? 0 : 6}>
                <motion.div onClick={() => handleClick(i)} whileTap={{ scale: 0.98 }}
                  className="glass cursor-pointer overflow-hidden"
                  style={{ borderLeft: read.has(i) ? '3px solid #ff6b9d' : '3px solid transparent' }}
                >
                  <div className="p-5 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <motion.span animate={active === i ? { scale: 1.35, rotate: 12 } : { scale: 1, rotate: 0 }}
                        transition={{ type: 'spring', stiffness: 300 }} className="text-2xl">{msg.icon}</motion.span>
                      <p className="text-pink-700/70 text-sm font-medium tracking-wide">{msg.short}</p>
                    </div>
                    <motion.span animate={{ rotate: active === i ? 45 : 0 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                      className="text-pink-300 text-lg flex-shrink-0">✦</motion.span>
                  </div>

                  <AnimatePresence>
                    {active === i && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 pb-5 pt-1">
                          <div className="h-px mb-4"
                            style={{ background: 'linear-gradient(90deg, transparent, rgba(255,107,157,0.35), transparent)' }} />
                          <p className="font-hand text-pink-700/75 leading-relaxed text-lg">{msg.full}</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </TiltCard>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal>
          <div className="text-center mt-16 mb-4">
            <p className="text-xs text-pink-300/60 tracking-widest uppercase mb-8">one more thing</p>
            <HoldReveal
              message="Whatever you're carrying right now — you don't have to carry it alone. I'm not going anywhere. I'm here."
              holdDuration={1600}
            />
          </div>
        </ScrollReveal>
      </div>
    </PageWrapper>
  )
}
