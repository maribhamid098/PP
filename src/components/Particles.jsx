import { useEffect, useRef } from 'react'

// Pink petal / particle canvas
export default function Particles({ count = 30 }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let animId
    let W = (canvas.width = window.innerWidth)
    let H = (canvas.height = window.innerHeight)

    // Pink shades only
    const pinks = ['#ffb3c6', '#ff85a1', '#ff6b9d', '#ffc2d4', '#ff9eb5', '#ffe0eb']

    const particles = Array.from({ length: count }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 2.5 + 0.8,
      dx: (Math.random() - 0.5) * 0.3,
      dy: -Math.random() * 0.4 - 0.15,
      alpha: Math.random() * 0.45 + 0.15,
      color: pinks[Math.floor(Math.random() * pinks.length)],
      // some are tiny hearts
      isHeart: Math.random() > 0.75,
    }))

    const drawHeart = (x, y, size, alpha) => {
      ctx.save()
      ctx.globalAlpha = alpha
      ctx.fillStyle = pinks[Math.floor(Math.random() * pinks.length)]
      ctx.font = `${size * 4}px serif`
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillText('♡', x, y)
      ctx.restore()
    }

    const draw = () => {
      ctx.clearRect(0, 0, W, H)
      particles.forEach((p) => {
        if (p.isHeart) {
          drawHeart(p.x, p.y, p.r, p.alpha * 0.5)
        } else {
          ctx.beginPath()
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
          ctx.fillStyle = p.color
          ctx.globalAlpha = p.alpha
          ctx.fill()
          ctx.globalAlpha = 1
        }
        p.x += p.dx
        p.y += p.dy
        if (p.y < -20) { p.y = H + 20; p.x = Math.random() * W }
        if (p.x < -20) p.x = W + 20
        if (p.x > W + 20) p.x = -20
      })
      animId = requestAnimationFrame(draw)
    }
    draw()

    const resize = () => { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight }
    window.addEventListener('resize', resize)
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', resize) }
  }, [count])

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" />
}
