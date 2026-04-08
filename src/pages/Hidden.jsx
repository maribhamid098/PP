import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import PageWrapper from '../components/PageWrapper'
import { useNavigate } from 'react-router-dom'
import Confetti from 'react-confetti'
import { useWindowSize } from '../hooks/useWindowSize'

const deepMessages = [
  { text: "You don't have to earn care. It's just there.", icon: '🌸' },
  { text: "I've been rooting for you quietly — even when we weren't talking.", icon: '🌷' },
  { text: "Express what you feel. You won't be judged for it. Not here.", icon: '🕊️' },
  { text: "There's no version of you that I'd find too much.", icon: '♡' },
  { text: "I see you — not just the parts you show, but the parts you're still figuring out.", icon: '✦' },
]

function PetalField() {
  useEffect(() => {
    const canvas = document.getElementById('petalCanvas')
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    const petals = Array.from({ length: 40 }, () => ({
      x: Math.random() * canvas.width, y: Math.random() * canvas.height - canvas.height,
      size: Math.random() * 10 + 6, speed: Math.random() * 1.2 + 0.4,
      drift: (Math.random() - 0.5) * 0.8, alpha: Math.random() * 0.5 + 0.2,
      hue: Math.floor(Math.random() * 30) + 330, // pink hues
    }))
    let id
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      petals.forEach(p => {
        ctx.save()
        ctx.globalAlpha = p.alpha
        ctx.fillStyle = `hsl(${p.hue}, 80%, 75%)`
        ctx.beginPath()
        ctx.ellipse(p.x, p.y, p.size * 0.5, p.size, 0, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()
        p.y += p.speed; p.x += p.drift
        if (p.y > canvas.height + 20) { p.y = -20; p.x = Math.random() * canvas.width }
      })
      id = requestAnimationFrame(draw)
    }
    draw()
    return () => cancelAnimationFrame(id)
  }, [])
  return <canvas id="petalCanvas" className="fixed inset-0 pointer-events-none z-0" />
}

export default function Hidden() {
  const [revealed, setRevealed] = useState([])
  const [allDone, setAllDone] = useState(false)
  const [confetti, setConfetti] = useState(false)
  const navigate = useNavigate()
  const { width, height } = useWindowSize()

  const reveal = (i) => {
    if (revealed.includes(i)) return
    if (navigator.vibrate) navigator.vibrate(35)
    const next = [...revealed, i]
    setRevealed(next)
    if (next.length === deepMessages.length) {
      setTimeout(() => {
        setAllDone(true); setConfetti(true)
        setTimeout(() => setConfetti(false), 5000)
      }, 500)
    }
  }

  return (
    <PageWrapper className="flex flex-col items-center justify-center px-6 py-20"
      style={{ background: 'linear-gradient(145deg, #2d0a1a 0%, #3d1525 50%, #1a0810 100%)', minHeight: '100svh' }}
    >
      <PetalField />
      {confetti && (
        <Confetti width={width} height={height} numberOfPieces={220}
          colors={['#ff6b9d', '#ffb3c6', '#ff85a1', '#ffc2d4', '#ffd6e7']} recycle={false} />
      )}

      <button onClick={() => navigate('/')}
        className="fixed top-6 left-6 z-50 text-pink-300/50 text-sm tracking-widest hover:text-pink-300 transition-colors">
        ← back
      </button>

      <div className="relative z-10 max-w-md w-full">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }} className="text-center mb-12"
        >
          <motion.div animate={{ rotate: 360 }} transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
            className="text-4xl mb-4 inline-block">🌸</motion.div>
          <p className="text-pink-300/60 text-xs tracking-widest uppercase mb-2">you found it</p>
          <h2 className="font-display text-pink-100" style={{ fontSize: 'clamp(1.8rem, 7vw, 2.5rem)' }}>
            The quiet part
          </h2>
          <p className="text-pink-400/60 text-sm mt-2">tap each one</p>
        </motion.div>

        <div className="flex flex-col gap-4">
          {deepMessages.map((msg, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, x: -28 }} animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.13, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              onClick={() => reveal(i)} whileTap={{ scale: 0.97 }}
              className="cursor-pointer rounded-2xl p-5 flex items-start gap-4 transition-all duration-300"
              style={{
                background: revealed.includes(i) ? 'rgba(255,107,157,0.1)' : 'rgba(255,255,255,0.04)',
                border: revealed.includes(i) ? '1px solid rgba(255,107,157,0.3)' : '1px solid rgba(255,255,255,0.07)',
              }}
            >
              <motion.span
                animate={revealed.includes(i) ? { scale: [1, 1.6, 1] } : {}}
                transition={{ duration: 0.5 }}
                className="text-2xl flex-shrink-0 mt-0.5"
              >
                {revealed.includes(i) ? msg.icon : '·'}
              </motion.span>
              <AnimatePresence mode="wait">
                {revealed.includes(i) ? (
                  <motion.p key="msg" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="font-hand text-pink-100 leading-relaxed text-lg">{msg.text}</motion.p>
                ) : (
                  <motion.p key="dots" className="text-pink-900/60 tracking-[0.3em] text-sm pt-1">
                    · · · · · · · · · · ·
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        <div className="flex justify-center gap-2 mt-7">
          {deepMessages.map((_, i) => (
            <motion.div key={i}
              animate={revealed.includes(i) ? { background: '#ff6b9d', scale: 1.4 } : { background: 'rgba(255,107,157,0.25)', scale: 1 }}
              className="w-1.5 h-1.5 rounded-full" />
          ))}
        </div>

        <AnimatePresence>
          {allDone && (
            <motion.div initial={{ opacity: 0, y: 24, scale: 0.94 }} animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="mt-12 text-center rounded-2xl p-8"
              style={{ background: 'rgba(255,107,157,0.07)', border: '1px solid rgba(255,107,157,0.25)' }}
            >
              <motion.div animate={{ scale: [1, 1.25, 1] }} transition={{ duration: 2, repeat: Infinity }}
                className="text-3xl mb-5">♥</motion.div>
              <p className="font-hand text-pink-200 leading-relaxed text-xl">
                This whole thing — every page, every word — was just a way of saying:
              </p>
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
                className="font-display text-pink-100 text-2xl mt-5">
                I'm here. I see you. Take your time.
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </PageWrapper>
  )
}
