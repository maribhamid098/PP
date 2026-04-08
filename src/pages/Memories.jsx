import { useState } from 'react'
import { motion } from 'framer-motion'
import PageWrapper from '../components/PageWrapper'
import ScrollReveal from '../components/ScrollReveal'
import SwipeCards from '../components/SwipeCards'
import TiltCard from '../components/TiltCard'
import FloatingOrbs from '../components/FloatingOrbs'

const memories = [
  { id: 1,  date: '22 August 2023',  title: 'The beginning',          icon: '🌸', desc: 'The day everything quietly shifted.',                    hidden: 'I remember thinking — this person is different. Something about the way you carry yourself just stayed with me.' },
  { id: 2,  date: 'Long walks',      title: 'Going nowhere, slowly',  icon: '🚶', desc: 'The kind of walks where time forgets to move.',          hidden: "Those walks weren't about the destination. They were about having someone to walk beside — and that was everything." },
  { id: 3,  date: 'Long rides',      title: 'Windows down',           icon: '🌙', desc: 'Roads that felt like they belonged to us.',              hidden: "There's something about moving fast while feeling completely still inside. That's what those rides were." },
  { id: 4,  date: 'Songs',           title: 'Shared playlists',       icon: '🎵', desc: 'Songs that now carry a different weight.',               hidden: "Every song we listened to together — I still can't hear them the same way. They all have your name on them now." },
  { id: 5,  date: 'Cooking',         title: 'Made with care',         icon: '🍳', desc: 'Small acts that meant more than they looked.',           hidden: 'Cooking for someone is a quiet way of saying — I want you to be okay. I want you to feel taken care of.' },
  { id: 6,  date: 'Singing',         title: 'Off-key and honest',     icon: '🎶', desc: 'Vulnerability dressed up as music.',                     hidden: "Singing for someone takes courage. It's hard to be that unguarded. But with you, it felt okay." },
  { id: 7,  date: 'Her hair',        title: 'The gentlest thing',     icon: '🌷', desc: 'Something so small, yet so full of care.',              hidden: "Making your hair was never just about hair. It was the closest thing to saying — I want to take care of you, in every small way I can." },
  { id: 8,  date: 'Peace',           title: 'Where I found stillness', icon: '🕊️', desc: 'Some people are a place, not just a person.',           hidden: "With you, the noise in my head would just… stop. You were the only place I ever truly felt at peace. I didn't know that was possible until you." },
  { id: 9,  date: 'Silly fights',    title: "The ones that didn't matter", icon: '🌧️', desc: 'And the ones that somehow did.',                hidden: 'Even the arguments were proof that we cared enough to feel things. You only fight with people who matter.' },
]

export default function Memories() {
  const [view, setView] = useState('swipe')

  return (
    <PageWrapper className="page-pad"
      style={{ background: 'linear-gradient(160deg, #fff0f5 0%, #ffe4ef 60%, #ffd6e7 100%)', minHeight: '100svh' }}
    >
      <FloatingOrbs />
      <div className="relative z-10 max-w-lg mx-auto px-5 pt-24">

        <ScrollReveal>
          <div className="text-center mb-10">
            <p className="text-xs text-pink-300 tracking-widest uppercase mb-2">a collection of</p>
            <h2 className="font-display text-pink-700/80" style={{ fontSize: 'clamp(2.2rem, 9vw, 3.2rem)' }}>
              Moments
            </h2>
            <p className="text-pink-400/60 text-sm mt-2 font-hand italic">nine things I'll never forget</p>
          </div>
        </ScrollReveal>

        {/* View toggle */}
        <ScrollReveal>
          <div className="flex justify-center mb-10">
            <div className="flex rounded-full p-1"
              style={{ background: 'rgba(255,240,245,0.7)', border: '1px solid rgba(255,179,198,0.4)' }}>
              {['swipe', 'timeline'].map((v) => (
                <motion.button key={v} onClick={() => setView(v)}
                  className="px-6 py-2 rounded-full text-xs tracking-widest uppercase"
                  animate={view === v
                    ? { background: 'linear-gradient(135deg,#ff85a1,#ff6b9d)', color: '#fff' }
                    : { background: 'transparent', color: '#ffb3c6' }}
                  transition={{ duration: 0.25 }}
                >{v}</motion.button>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {view === 'swipe' && (
          <ScrollReveal><SwipeCards cards={memories} /></ScrollReveal>
        )}

        {view === 'timeline' && (
          <div className="relative">
            <div className="absolute left-5 top-0 bottom-0 w-px"
              style={{ background: 'linear-gradient(to bottom, transparent, #ffb3c6, #ff6b9d, #ffb3c6, transparent)' }} />
            <div className="flex flex-col gap-7 pl-14">
              {memories.map((m, i) => (
                <ScrollReveal key={m.id}>
                  <div className="relative">
                    <motion.div initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }}
                      transition={{ type: 'spring', stiffness: 300 }}
                      className="absolute -left-9 top-4 w-4 h-4 rounded-full"
                      style={{ background: 'linear-gradient(135deg,#ffb3c6,#ff6b9d)', boxShadow: '0 0 14px rgba(255,107,157,0.5)' }} />
                    <TiltCard intensity={7}>
                      <div className="glass glow-soft p-5">
                        <p className="text-xs text-pink-300 tracking-widest mb-1">{m.date}</p>
                        <div className="flex items-start gap-3">
                          <motion.span animate={{ rotate: [0, 8, -8, 0] }}
                            transition={{ duration: 5, repeat: Infinity, delay: i * 0.3 }}
                            className="text-2xl flex-shrink-0">{m.icon}</motion.span>
                          <div>
                            <p className="font-display text-pink-700/80 text-lg">{m.title}</p>
                            <p className="text-pink-400/60 text-sm mt-1">{m.desc}</p>
                            <p className="font-hand text-pink-700/65 text-sm mt-2 leading-relaxed">{m.hidden}</p>
                          </div>
                        </div>
                      </div>
                    </TiltCard>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        )}

        <ScrollReveal>
          <div className="text-center mt-16">
            <a href="/distance" className="inline-flex items-center gap-2 text-sm text-pink-300 hover:text-pink-500 transition-colors tracking-widest">
              then things changed
              <motion.span animate={{ x: [0, 5, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>→</motion.span>
            </a>
          </div>
        </ScrollReveal>
      </div>
    </PageWrapper>
  )
}
