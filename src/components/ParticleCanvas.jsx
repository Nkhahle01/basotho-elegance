import { useEffect, useRef } from 'react'

const GOLD = { r: 212, g: 175, b: 55 }
const MAX_DPR = 2
const BURST_DURATION_MS = 2600

function createParticle(width, height) {
  const size = 0.6 + Math.random() * 2.2
  const drift = 0.08 + Math.random() * 0.22
  const diagonal = (Math.random() - 0.5) * 0.35

  return {
    x: Math.random() * width,
    y: Math.random() * height,
    size,
    opacity: 0.1 + Math.random() * 0.4,
    vx: diagonal,
    vy: -(drift + size * 0.04),
    phase: Math.random() * Math.PI * 2,
    sway: 0.15 + Math.random() * 0.35,
  }
}

function createMarginParticle(width, height, side) {
  const margin = side === 'left' ? Math.random() * 48 : width - Math.random() * 48
  const size = 1 + Math.random() * 2.8

  return {
    x: margin,
    y: height * (0.55 + Math.random() * 0.45),
    size,
    opacity: 0.35 + Math.random() * 0.35,
    vx: (Math.random() - 0.5) * 0.6,
    vy: -(0.55 + Math.random() * 0.85),
    phase: Math.random() * Math.PI * 2,
    sway: 0.25 + Math.random() * 0.45,
    isBurst: true,
  }
}

function getParticleCount(width, height) {
  const area = width * height
  const density = area < 480 * 800 ? 0.000045 : 0.00006
  return Math.min(90, Math.max(28, Math.round(area * density)))
}

function ParticleCanvas({ burstActive = false }) {
  const canvasRef = useRef(null)
  const frameRef = useRef(0)
  const burstRef = useRef({ active: false, until: 0 })

  useEffect(() => {
    if (burstActive) {
      burstRef.current = { active: true, until: performance.now() + BURST_DURATION_MS }
    }
  }, [burstActive])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches

    const ctx = canvas.getContext('2d', { alpha: true, desynchronized: true })
    if (!ctx) return

    let width = 0
    let height = 0
    let particles = []
    let burstParticles = []
    let running = true
    let lastTime = 0

    const resize = () => {
      const { clientWidth, clientHeight } = canvas
      width = clientWidth
      height = clientHeight
      const dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR)

      canvas.width = Math.floor(width * dpr)
      canvas.height = Math.floor(height * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      particles = Array.from({ length: getParticleCount(width, height) }, () =>
        createParticle(width, height),
      )
      burstParticles = []
    }

    const recycle = (particle) => {
      particle.x = Math.random() * width
      particle.y = height + particle.size
      particle.size = 0.6 + Math.random() * 2.2
      particle.opacity = 0.1 + Math.random() * 0.4
      particle.vx = (Math.random() - 0.5) * 0.35
      particle.vy = -(0.08 + Math.random() * 0.22 + particle.size * 0.04)
      particle.phase = Math.random() * Math.PI * 2
      particle.sway = 0.15 + Math.random() * 0.35
      particle.isBurst = false
    }

    const drawParticle = (particle, time, delta, intensity) => {
      const speedBoost = intensity > 1 ? intensity : 1
      const swayBoost = intensity > 1 ? 1.4 : 1

      particle.x +=
        (particle.vx +
          Math.sin(time * 0.00035 + particle.phase) * particle.sway * swayBoost) *
        delta *
        speedBoost
      particle.y += particle.vy * delta * speedBoost

      if (particle.isBurst) {
        if (particle.y < -particle.size * 3 || particle.opacity <= 0.05) {
          return false
        }
        particle.opacity -= 0.002 * delta
      } else if (particle.y < -particle.size * 2) {
        recycle(particle)
      } else if (particle.x < -particle.size * 2) {
        particle.x = width + particle.size
      } else if (particle.x > width + particle.size * 2) {
        particle.x = -particle.size
      }

      ctx.globalAlpha = particle.opacity
      ctx.fillStyle = `rgb(${GOLD.r}, ${GOLD.g}, ${GOLD.b})`
      ctx.beginPath()
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
      ctx.fill()
      return true
    }

    const drawStaticField = () => {
      ctx.clearRect(0, 0, width, height)
      for (const particle of particles) {
        ctx.globalAlpha = particle.opacity
        ctx.fillStyle = `rgb(${GOLD.r}, ${GOLD.g}, ${GOLD.b})`
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fill()
      }
      ctx.globalAlpha = 1
    }

    const tick = (time) => {
      if (!running) return

      frameRef.current = requestAnimationFrame(tick)

      if (prefersReducedMotion) return

      const delta = Math.min((time - lastTime) / 16.67, 2)
      lastTime = time

      const burst = burstRef.current
      const burstLive = burst.active && time < burst.until
      if (!burstLive) {
        burst.active = false
      }

      const intensity = burstLive ? 2.2 : 1

      if (burstLive && Math.random() < 0.55) {
        burstParticles.push(
          createMarginParticle(width, height, Math.random() < 0.5 ? 'left' : 'right'),
        )
      }

      ctx.clearRect(0, 0, width, height)

      for (const particle of particles) {
        drawParticle(particle, time, delta, intensity)
      }

      burstParticles = burstParticles.filter((particle) =>
        drawParticle(particle, time, delta, 1.6),
      )

      ctx.globalAlpha = 1
    }

    const onVisibilityChange = () => {
      running = document.visibilityState === 'visible'
      if (running) {
        lastTime = performance.now()
        frameRef.current = requestAnimationFrame(tick)
      } else {
        cancelAnimationFrame(frameRef.current)
      }
    }

    resize()

    if (prefersReducedMotion) {
      drawStaticField()
    } else {
      lastTime = performance.now()
      frameRef.current = requestAnimationFrame(tick)
    }

    const resizeObserver = new ResizeObserver(resize)
    resizeObserver.observe(canvas)
    document.addEventListener('visibilitychange', onVisibilityChange)

    return () => {
      running = false
      cancelAnimationFrame(frameRef.current)
      resizeObserver.disconnect()
      document.removeEventListener('visibilitychange', onVisibilityChange)
    }
  }, [])

  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden="true"
    >
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.35)_55%,rgba(0,0,0,0.92)_100%)]" />
    </div>
  )
}

export default ParticleCanvas
