import { useState } from 'react'
import { motion, useMotionValue, useTransform, animate } from 'framer-motion'

export default function SwipeCards({ cards }) {
  const [gone, setGone] = useState([])

  const dismiss = (id) => setGone((g) => [...g, id])
  const remaining = cards.filter((c) => !gone.includes(c.id))

  if (remaining.length === 0) return (
    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
      className="glass p-8 text-center w-full max-w-sm mx-auto"
    >
      <div className="text-4xl mb-3 heartbeat">♡</div>
      <p className="font-hand text-pink-700/70 text-xl">every moment counted</p>
      <button onClick={() => setGone([])}
        className="mt-5 text-xs text-pink-300 tracking-widest uppercase border border-pink-200 px-4 py-2 rounded-full">
        revisit
      </button>
    </motion.div>
  )

  return (
    <div className="relative w-full flex flex-col items-center" style={{ minHeight: 280 }}>
      {remaining.slice(1, 3).map((card, i) => (
        <div key={card.id} className="absolute w-full max-w-sm glass"
          style={{ transform: `translateY(${(i+1)*9}px) scale(${1-(i+1)*0.04})`,
            zIndex: remaining.length - i - 2, opacity: 1 - (i+1)*0.18 }}>
          <div className="p-6 h-44" />
        </div>
      ))}
      <DraggableCard key={remaining[0].id} card={remaining[0]} onDismiss={dismiss} zIndex={remaining.length} />
      <div className="mt-6 flex items-center gap-2 text-xs text-pink-300">
        <span className="swipe-hint">←</span>
        <span>swipe to explore</span>
        <span className="swipe-hint" style={{ animationDelay: '0.3s' }}>→</span>
      </div>
      <div className="flex gap-1.5 mt-3">
        {cards.map((c) => (
          <motion.div key={c.id}
            animate={gone.includes(c.id) ? { background: '#ff6b9d', scale: 1 } : { background: 'rgba(255,179,198,0.4)', scale: 1 }}
            className="w-1.5 h-1.5 rounded-full"
          />
        ))}
      </div>
    </div>
  )
}

function DraggableCard({ card, onDismiss, zIndex }) {
  const x = useMotionValue(0)
  const rotate = useTransform(x, [-200, 200], [-16, 16])
  const opacity = useTransform(x, [-160, 0, 160], [0.6, 1, 0.6])
  const [revealed, setRevealed] = useState(false)

  const handleDragEnd = (_, info) => {
    if (Math.abs(info.offset.x) > 75) {
      animate(x, info.offset.x > 0 ? 450 : -450, { duration: 0.28 })
      setTimeout(() => onDismiss(card.id), 280)
    } else {
      animate(x, 0, { type: 'spring', stiffness: 320, damping: 26 })
    }
  }

  return (
    <motion.div
      style={{ x, rotate, opacity, zIndex, touchAction: 'none' }}
      drag="x" dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={handleDragEnd}
      onClick={() => !revealed && setRevealed(true)}
      whileTap={{ cursor: 'grabbing' }}
      className="absolute w-full max-w-sm glass glow-soft p-6 cursor-grab select-none"
    >
      <motion.div className="absolute top-4 left-4 text-pink-400 text-xs font-bold tracking-widest border border-pink-300 px-2 py-1 rounded-lg"
        style={{ opacity: useTransform(x, [20, 80], [0, 1]) }}>♡ keep</motion.div>
      <motion.div className="absolute top-4 right-4 text-pink-300 text-xs font-bold tracking-widest border border-pink-200 px-2 py-1 rounded-lg"
        style={{ opacity: useTransform(x, [-80, -20], [1, 0]) }}>next →</motion.div>

      <div className="text-center pt-2">
        <motion.span animate={{ rotate: [0, 8, -8, 0] }} transition={{ duration: 4, repeat: Infinity }}
          className="text-4xl inline-block">{card.icon}</motion.span>
        <p className="text-xs text-pink-300 tracking-widest uppercase mt-3 mb-1">{card.date}</p>
        <p className="font-display text-pink-800/80 text-xl mb-2">{card.title}</p>
        {!revealed ? (
          <>
            <p className="text-pink-600/60 text-sm">{card.desc}</p>
            <p className="text-xs text-pink-200 mt-3">tap to read · swipe to continue</p>
          </>
        ) : (
          <motion.p initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
            className="font-hand text-pink-800/75 text-base leading-relaxed">{card.hidden}</motion.p>
        )}
      </div>
    </motion.div>
  )
}
