import { useEffect, useRef } from 'react'

// Reusable animation hooks
export function useScrollReveal(threshold = 0.15) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.opacity = '1'
          el.style.transform = 'translateY(0)'
          observer.unobserve(el)
        }
      },
      { threshold }
    )
    el.style.opacity = '0'
    el.style.transform = 'translateY(30px)'
    el.style.transition = 'opacity 0.7s ease, transform 0.7s ease'
    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold])
  return ref
}

export function useTypewriter(text, speed = 60) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    el.textContent = ''
    let i = 0
    const timer = setInterval(() => {
      if (i < text.length) {
        el.textContent += text[i]
        i++
      } else {
        clearInterval(timer)
      }
    }, speed)
    return () => clearInterval(timer)
  }, [text, speed])
  return ref
}
