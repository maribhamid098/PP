import { useScrollReveal } from '../hooks/useAnimations'

export default function ScrollReveal({ children, className = '' }) {
  const ref = useScrollReveal()
  return <div ref={ref} className={className}>{children}</div>
}
