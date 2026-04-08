import { useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'

const links = [
  { to: '/',          label: 'Home',     icon: '✦' },
  { to: '/memories',  label: 'Memories', icon: '🌸' },
  { to: '/distance',  label: 'Distance', icon: '🌙' },
  { to: '/present',   label: 'Present',  icon: '✿' },
  { to: '/message',   label: 'Message',  icon: '♡' },
]

export default function Nav() {
  const location = useLocation()
  if (location.pathname === '/secret-garden') return null

  return (
    <>
      {/* ── Desktop pill nav ── */}
      <motion.nav
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-4 left-1/2 z-50 hidden md:flex items-center gap-1 px-4 py-2 rounded-full"
        style={{
          transform: 'translateX(-50%)',
          background: 'rgba(255,240,245,0.75)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255,182,205,0.5)',
          boxShadow: '0 4px 24px rgba(255,105,150,0.12)',
        }}
      >
        <NavLink to="/" className="text-pink-400 font-hand text-lg px-3 py-1 select-none">♡ M</NavLink>
        <div className="w-px h-4 mx-1" style={{ background: 'rgba(255,182,205,0.5)' }} />
        {links.map(({ to, label }) => (
          <NavLink key={to} to={to}
            className={({ isActive }) =>
              `relative px-3 py-1.5 text-xs tracking-widest uppercase rounded-full transition-all duration-300 ${
                isActive ? 'text-pink-500' : 'text-pink-300 hover:text-pink-400'
              }`
            }
          >
            {({ isActive }) => (
              <>
                {isActive && (
                  <motion.div layoutId="navPill"
                    className="absolute inset-0 rounded-full"
                    style={{ background: 'rgba(255,105,150,0.12)' }}
                    transition={{ type: 'spring', stiffness: 400, damping: 35 }}
                  />
                )}
                <span className="relative z-10">{label}</span>
              </>
            )}
          </NavLink>
        ))}
      </motion.nav>

      {/* ── Mobile bottom tab bar ── */}
      <motion.div
        initial={{ y: 24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="fixed bottom-0 left-0 right-0 z-50 md:hidden"
        style={{
          background: 'rgba(255,240,245,0.85)',
          backdropFilter: 'blur(20px)',
          borderTop: '1px solid rgba(255,182,205,0.4)',
          paddingBottom: 'env(safe-area-inset-bottom)',
        }}
      >
        <div className="flex items-center justify-around px-2 py-2">
          {links.map(({ to, label, icon }) => (
            <NavLink key={to} to={to}
              className={({ isActive }) =>
                `flex flex-col items-center gap-0.5 px-3 py-2 rounded-2xl transition-all duration-200 min-w-[52px] ${
                  isActive ? 'text-pink-500' : 'text-pink-300'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <motion.span animate={isActive ? { scale: 1.25 } : { scale: 1 }}
                    transition={{ type: 'spring', stiffness: 400 }}
                    className="text-xl leading-none"
                  >
                    {icon}
                  </motion.span>
                  <span className="text-[9px] tracking-wider uppercase">{label}</span>
                  {isActive && (
                    <motion.div layoutId="mobileNavDot"
                      className="w-1 h-1 rounded-full"
                      style={{ background: '#ff6b9d' }}
                      transition={{ type: 'spring', stiffness: 400, damping: 35 }}
                    />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </div>
      </motion.div>
    </>
  )
}
