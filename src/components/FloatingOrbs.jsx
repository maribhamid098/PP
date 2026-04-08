// All pink orbs — no purple
export default function FloatingOrbs() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <div className="absolute w-72 h-72 rounded-full blur-3xl opacity-40 float"
        style={{ background: 'radial-gradient(circle, #ffd6e7 0%, transparent 70%)', top: '8%', left: '3%' }} />
      <div className="absolute w-96 h-96 rounded-full blur-3xl opacity-25 float-delay"
        style={{ background: 'radial-gradient(circle, #ffb3c6 0%, transparent 70%)', top: '45%', right: '5%' }} />
      <div className="absolute w-80 h-80 rounded-full blur-3xl opacity-30 float-delay2"
        style={{ background: 'radial-gradient(circle, #ffe0eb 0%, transparent 70%)', bottom: '10%', left: '10%' }} />
      <div className="absolute w-56 h-56 rounded-full blur-3xl opacity-20 float"
        style={{ background: 'radial-gradient(circle, #ff9eb5 0%, transparent 70%)', top: '25%', right: '25%', animationDelay: '1s' }} />
    </div>
  )
}
