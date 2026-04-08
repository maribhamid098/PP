import { useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import PageWrapper from '../components/PageWrapper'
import ScrollReveal from '../components/ScrollReveal'
import TiltCard from '../components/TiltCard'

const phases = [
  { label: 'The silence',      text: "There was a point where words stopped coming easily. That happens sometimes — not because people stop caring, but because they don't know how to hold everything at once.", tone: '#ffccd5', emoji: '🌫️' },
  { label: 'The distance',     text: "A year is a long time. Long enough to change, to grow, to understand things you couldn't before. Distance isn't always loss — sometimes it's just space.", tone: '#ffb3c6', emoji: '🌊' },
  { label: 'The quiet growth', text: "Both of us were figuring things out separately. That's not a failure. That's just life moving at its own pace.", tone: '#ff9eb5', emoji: '🌱' },
  { label: 'No blame',         text: "There's nothing to assign here. No villain, no mistake that defines everything. Just two people navigating something neither of them had a map for.", tone: '#ff85a1', emoji: '🕊️' },
  { label: 'What remained',    text: "Even through all of it — the care didn't disappear. It just waited quietly. Some things don't leave, they just go still.", tone: '#ff6b9d', emoji: '🌸' },
]

export default function Distance() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end end'] })
  const bgColor = useTransform(scrollYProgress, [0, 0.5, 1], ['#f5e0ea', '#fce4ee', '#fff0f5'])
  const [active, setActive] = useState(null)

  return (
    <PageWrapper className="page-pad">
      <motion.div ref={containerRef} style={{ backgroundColor: bgColor }} className="min-h-screen">
        <div className="max-w-lg mx-auto px-5 pt-24">

          <ScrollReveal>
            <div className="text-center mb-14">
              <p className="text-xs tracking-widest uppercase text-pink-300 mb-2">a year in between</p>
              <h2 className="font-display text-pink-700/80" style={{ fontSize: 'clamp(2.2rem, 9vw, 3.2rem)' }}>
                Distance & Growth
              </h2>
              <p className="text-pink-400/60 text-sm mt-2 font-hand italic">tap each phase</p>
            </div>
          </ScrollReveal>

          {/* Scroll progress bar */}
          <ScrollReveal>
            <div className="mb-12 px-1">
              <div className="flex justify-between text-xs text-pink-300/60 mb-2">
                <span>then</span><span>now</span>
              </div>
              <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,179,198,0.2)' }}>
                <motion.div className="h-full rounded-full"
                  style={{ width: useTransform(scrollYProgress, [0,1], ['0%','100%']),
                    background: 'linear-gradient(90deg, #ffccd5, #ff6b9d)' }} />
              </div>
            </div>
          </ScrollReveal>

          <div className="flex flex-col gap-5">
            {phases.map((phase, i) => (
              <ScrollReveal key={i}>
                <TiltCard intensity={5}>
                  <motion.div onClick={() => setActive(active === i ? null : i)}
                    whileTap={{ scale: 0.98 }} className="glass p-6 cursor-pointer"
                    style={{ borderLeft: `3px solid ${phase.tone}` }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{phase.emoji}</span>
                        <p className="text-xs tracking-widest uppercase text-pink-400/70">{phase.label}</p>
                      </div>
                      <motion.span animate={{ rotate: active === i ? 45 : 0 }}
                        transition={{ type: 'spring', stiffness: 300 }}
                        className="text-pink-300 text-lg">✦</motion.span>
                    </div>

                    {active !== i && (
                      <p className="text-pink-500/50 text-sm line-clamp-1">{phase.text.slice(0, 58)}…</p>
                    )}
                    <motion.div
                      animate={{ height: active === i ? 'auto' : 0, opacity: active === i ? 1 : 0 }}
                      initial={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="font-hand text-pink-700/70 leading-relaxed text-lg pt-2">{phase.text}</p>
                    </motion.div>
                  </motion.div>
                </TiltCard>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal>
            <div className="text-center mt-20 mb-8">
              <motion.div animate={{ opacity: [0.3, 1, 0.3], scale: [1, 1.12, 1] }}
                transition={{ duration: 3, repeat: Infinity }} className="text-3xl mb-5">🌸</motion.div>
              <p className="font-hand text-pink-600/70 text-xl">and then, slowly, things found their way back.</p>
              <a href="/present" className="inline-flex items-center gap-2 mt-8 text-sm text-pink-300 hover:text-pink-500 transition-colors tracking-widest">
                where we are now
                <motion.span animate={{ x: [0, 5, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>→</motion.span>
              </a>
            </div>
          </ScrollReveal>
        </div>
      </motion.div>
    </PageWrapper>
  )
}
