import { useEffect, useRef, useCallback } from 'react'

// 23 skills requested by user
const SKILL_WORDS = [
  'UX', 'UI', 'AI',
  'CSS', 'SEO', 'Web', 'iOS',
  'HTML', 'Logo', 'Agile',
  'Figma', 'Visual', 'Motion', 'Mobile',
  'Coding', 'Webflow',
  'Branding', 'Strategy',
  'Prototype', 'A/B Test',
  'JavaScript', 'Experiment', 'Interactive',
]

const VSPACING = 16   // px between letter-centre points vertically
const GRAVITY   = 0.58
const JUMP_VY   = -18
const BASE_SPD  = 2.6   // slower
const FLOOR_R   = 0.74   // floor lower → more vertical space

const CHAR_X = 130
const CH     = 62   // slightly bigger character
const CW     = 22   // bounding width
const OBW    = 24   // obstacle width

type Obs      = { x: number; h: number; kw: string; lit: number; passed: boolean }
type Particle = { x: number; y: number; vx: number; vy: number; life: number; color: string }
type GS  = {
  vy: number; py: number; obs: Obs[]
  score: number; dead: boolean; started: boolean; won: boolean
  frame: number; speed: number; next: number; ki: number
  bgX: number; particles: Particle[]
  lives: number; invincible: number
}

const mkState = (): GS => ({
  vy: 0, py: 0, obs: [], score: 0, dead: false,
  started: false, won: false, frame: 0, speed: BASE_SPD, next: 90, ki: 0,
  bgX: 0, particles: [],
  lives: 3, invincible: 0,
})

// ─── Background wave ─────────────────────────────────────────────────────────

function drawWave(ctx: CanvasRenderingContext2D, W: number, gY: number) {
  const centerY = gY * 0.46
  const amp     = gY * 0.10
  const STEPS   = 400

  ctx.save()
  ctx.strokeStyle = 'rgba(255,255,255,0.45)'
  ctx.lineWidth   = 1.8
  ctx.lineJoin    = 'round'
  ctx.beginPath()

  for (let i = 0; i <= STEPS; i++) {
    const t = i / STEPS
    const x = t * W
    const y = centerY + Math.sin(t * Math.PI * 4) * amp
    if (i === 0) ctx.moveTo(x, y)
    else         ctx.lineTo(x, y)
  }

  ctx.stroke()
  ctx.restore()
}

// ─── Scrolling clouds ────────────────────────────────────────────────────────

// Each cloud: base x (0–1 of W), y as absolute canvas-height fraction (0–1), width px
const CLOUD_DEFS = [
  { xBase: 0.06, y: 0.26, w: 94  },
  { xBase: 0.28, y: 0.22, w: 70  },
  { xBase: 0.50, y: 0.30, w: 112 },
  { xBase: 0.72, y: 0.24, w: 80  },
  { xBase: 0.94, y: 0.28, w: 88  },
]

function drawClouds(ctx: CanvasRenderingContext2D, W: number, H: number, drift: number) {
  const range = W * 1.5

  ctx.save()
  ctx.strokeStyle = 'rgba(255,255,255,0.36)'
  ctx.lineWidth   = 1.4
  ctx.lineJoin    = 'round'
  ctx.lineCap     = 'round'

  CLOUD_DEFS.forEach(cd => {
    const offset = drift % range
    const cx = ((cd.xBase * W - offset) % range + range) % range - W * 0.15
    const cy = cd.y * H          // ← absolute canvas height fraction
    const w  = cd.w
    const h  = w * 0.30
    const b  = w * 0.155

    ctx.beginPath()
    ctx.moveTo(cx, cy)
    ctx.arc(cx + w * 0.18, cy - h * 0.50, b * 0.88, Math.PI, 0)
    ctx.arc(cx + w * 0.50, cy - h * 0.95, b * 1.22, Math.PI, 0)
    ctx.arc(cx + w * 0.82, cy - h * 0.50, b * 0.88, Math.PI, 0)
    ctx.lineTo(cx + w, cy)
    ctx.closePath()
    ctx.stroke()
  })

  ctx.restore()
}

// ─── Game title ──────────────────────────────────────────────────────────────

function drawTitle(ctx: CanvasRenderingContext2D, W: number) {
  const title = "SIHANG'S ADVENTURE"
  const TY    = 88

  ctx.save()
  ctx.textAlign    = 'center'
  ctx.textBaseline = 'middle'
  ctx.font         = '600 16px "Inter", sans-serif'
  ;(ctx as CanvasRenderingContext2D & { letterSpacing?: string }).letterSpacing = '0.30em'

  // Main title
  ctx.fillStyle = 'rgba(255,255,255,0.80)'
  ctx.fillText(title, W / 2, TY)

  // Flanking decorative lines
  const tw  = ctx.measureText(title).width + 44
  const gap = 14
  const lineLen = Math.max(28, W / 2 - tw / 2 - gap - 60)

  ctx.strokeStyle = 'rgba(255,255,255,0.40)'
  ctx.lineWidth   = 1.2

  ctx.beginPath()
  ctx.moveTo(W / 2 - tw / 2 - gap - lineLen, TY)
  ctx.lineTo(W / 2 - tw / 2 - gap,           TY)
  ctx.stroke()

  ctx.beginPath()
  ctx.moveTo(W / 2 + tw / 2 + gap,           TY)
  ctx.lineTo(W / 2 + tw / 2 + gap + lineLen, TY)
  ctx.stroke()

  // Small diamond accent at line midpoints
  const diamond = (cx: number, cy: number) => {
    ctx.fillStyle = 'rgba(255,255,255,0.50)'
    ctx.beginPath()
    ctx.moveTo(cx, cy - 3); ctx.lineTo(cx + 3, cy)
    ctx.lineTo(cx, cy + 3); ctx.lineTo(cx - 3, cy)
    ctx.closePath(); ctx.fill()
  }
  diamond(W / 2 - tw / 2 - gap - lineLen / 2, TY)
  diamond(W / 2 + tw / 2 + gap + lineLen / 2, TY)

  ctx.restore()
}

// Universal rounded-rect path (no ctx.roundRect dependency)
function rrPath(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath()
  ctx.moveTo(x + r, y)
  ctx.lineTo(x + w - r, y)
  ctx.arcTo(x + w, y,     x + w, y + r,     r)
  ctx.lineTo(x + w, y + h - r)
  ctx.arcTo(x + w, y + h, x + w - r, y + h, r)
  ctx.lineTo(x + r, y + h)
  ctx.arcTo(x,     y + h, x,     y + h - r, r)
  ctx.lineTo(x,     y + r)
  ctx.arcTo(x,     y,     x + r, y,         r)
  ctx.closePath()
}

const FW_COLORS = ['#ff6b6b','#ffd93d','#6bcb77','#4d96ff','#ff6bdf','#ff9f43','#c4ff23','#a29bfe']

function spawnFirework(particles: Particle[], x: number, y: number) {
  for (let i = 0; i < 28; i++) {
    const angle = (i / 28) * Math.PI * 2
    const speed = 1.5 + Math.random() * 4
    particles.push({
      x, y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed - 1,
      life: 1.0,
      color: FW_COLORS[Math.floor(Math.random() * FW_COLORS.length)],
    })
  }
}

function drawChar(ctx: CanvasRenderingContext2D, gY: number, py: number, f: number, dead: boolean) {
  const cx    = CHAR_X + CW / 2
  const footY = gY - py
  const isAir = py > 4
  const col   = dead ? '#ff5a46' : '#ffffff'
  const phase = (f % 32) / 32 * Math.PI * 2

  // Proportions
  const headR    = 10
  const headCY   = footY - CH + headR
  const shouldY  = headCY + headR + 2
  const bodyH    = 19
  const bodyW    = 13
  const hipY     = shouldY + bodyH

  ctx.save()
  ctx.fillStyle   = col
  ctx.strokeStyle = col
  ctx.lineCap     = 'round'
  ctx.lineJoin    = 'round'

  // Ground shadow ellipse
  if (!dead) {
    const sg = ctx.createRadialGradient(cx, gY + 1, 0, cx, gY + 1, 18)
    sg.addColorStop(0, `rgba(0,0,0,${isAir ? 0.08 : 0.30})`)
    sg.addColorStop(1, 'rgba(0,0,0,0)')
    ctx.fillStyle = sg
    ctx.beginPath()
    ctx.ellipse(cx, gY + 1, isAir ? 10 : 18, isAir ? 3 : 6, 0, 0, Math.PI * 2)
    ctx.fill()
    ctx.fillStyle = col
  }

  // Speed lines (only while running on ground)
  if (!dead && !isAir) {
    const lines = [
      { x: cx - 22, y: hipY + 3,  len: 15 },
      { x: cx - 30, y: hipY - 7,  len: 22 },
      { x: cx - 18, y: hipY - 17, len: 11 },
    ]
    lines.forEach((l, i) => {
      ctx.save()
      ctx.strokeStyle = `rgba(255,255,255,${0.07 + i * 0.025})`
      ctx.lineWidth   = 1.2
      ctx.beginPath(); ctx.moveTo(l.x, l.y); ctx.lineTo(l.x - l.len, l.y); ctx.stroke()
      ctx.restore()
    })
  }

  // Legs (drawn first — behind body)
  ctx.lineWidth = 5.5

  if (dead) {
    ctx.beginPath()
    ctx.moveTo(cx - 2, hipY); ctx.lineTo(cx - 17, footY - 1)
    ctx.moveTo(cx + 2, hipY); ctx.lineTo(cx + 11, footY - 1)
    ctx.stroke()
  } else if (isAir) {
    ctx.beginPath()
    ctx.moveTo(cx - 3, hipY); ctx.lineTo(cx - 11, hipY + 9)
    ctx.moveTo(cx + 3, hipY); ctx.lineTo(cx + 11, hipY + 9)
    ctx.stroke()
  } else {
    const sw = Math.sin(phase) * 16
    // Two-segment legs via quadratic curve
    ctx.beginPath()
    ctx.moveTo(cx - 3, hipY)
    ctx.quadraticCurveTo(cx - 3 + sw * 0.2, hipY + 9, cx + sw * 0.6, footY - 2)
    ctx.stroke()
    ctx.beginPath()
    ctx.moveTo(cx + 3, hipY)
    ctx.quadraticCurveTo(cx + 3 - sw * 0.2, hipY + 9, cx - sw * 0.6, footY - 2)
    ctx.stroke()
  }

  // Body (filled rounded rect)
  ctx.fillStyle = col
  rrPath(ctx, cx - bodyW / 2, shouldY, bodyW, bodyH, 5); ctx.fill()

  // Arms
  ctx.lineWidth = 4.5
  const armSwing = dead ? 0.4 : (isAir ? -0.7 : Math.sin(phase) * 0.65)
  ctx.beginPath()
  ctx.moveTo(cx - bodyW / 2, shouldY + 4)
  ctx.lineTo(cx - bodyW / 2 - 9 * Math.sin(0.4 - armSwing),
             shouldY + 4 + 10 * Math.cos(0.4 - armSwing))
  ctx.stroke()
  ctx.beginPath()
  ctx.moveTo(cx + bodyW / 2, shouldY + 4)
  ctx.lineTo(cx + bodyW / 2 + 9 * Math.sin(0.4 + armSwing),
             shouldY + 4 + 10 * Math.cos(0.4 + armSwing))
  ctx.stroke()

  // Head
  ctx.fillStyle = col
  ctx.beginPath(); ctx.arc(cx, headCY, headR, 0, Math.PI * 2); ctx.fill()

  if (!dead) {
    // Eye
    ctx.fillStyle = '#0d0d0d'
    ctx.beginPath(); ctx.arc(cx + 4, headCY + 1, 2.5, 0, Math.PI * 2); ctx.fill()
  } else {
    // × eyes
    ctx.strokeStyle = '#0d0d0d'
    ctx.lineWidth   = 1.8
    const ex = cx + 4, ey = headCY
    ctx.beginPath()
    ctx.moveTo(ex - 3, ey - 3); ctx.lineTo(ex + 3, ey + 3)
    ctx.moveTo(ex + 3, ey - 3); ctx.lineTo(ex - 3, ey + 3)
    ctx.stroke()
  }

  ctx.restore()
}

function drawObs(ctx: CanvasRenderingContext2D, o: Obs, gY: number) {
  const lit  = o.lit > 0
  const cx   = o.x + OBW / 2
  const word = o.kw.toUpperCase()
  const col  = lit ? '#c4ff23' : 'rgba(255,255,255,0.88)'

  ctx.save()
  ctx.fillStyle    = col
  ctx.font         = '700 12px Inter, sans-serif'
  ctx.textAlign    = 'center'
  ctx.textBaseline = 'middle'

  const spacing = o.h / word.length

  for (let i = 0; i < word.length; i++) {
    const y = gY - o.h + spacing * (i + 0.5)
    ctx.fillText(word[i], cx, y)
  }

  // Skill name label below the floor line
  ctx.font         = '700 13px Inter, sans-serif'
  ctx.textBaseline = 'top'
  ctx.fillStyle    = lit ? '#c4ff23' : 'rgba(255,255,255,0.85)'
  ctx.fillText(o.kw, cx, gY + 12)

  ctx.restore()
}

export default function GameSlide({ isActive }: { isActive: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const gsRef     = useRef<GS>(mkState())
  const rafRef    = useRef(0)

  const jump = useCallback(() => {
    const s = gsRef.current
    if (!s.started)    { s.started = true; return }
    if (s.won || s.dead) { gsRef.current = { ...mkState(), started: true }; return }
    if (s.py === 0) s.vy = JUMP_VY
  }, [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.code === 'Space' || e.code === 'ArrowUp') { e.preventDefault(); jump() }
    }
    if (isActive) window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [isActive, jump])

  useEffect(() => {
    if (!isActive) { cancelAnimationFrame(rafRef.current); return }

    const canvas = canvasRef.current
    if (!canvas) return

    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight }
    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(canvas)

    const tick = () => {
      const ctx = canvas.getContext('2d')
      if (!ctx) return
      const W = canvas.width, H = canvas.height, gY = H * FLOOR_R
      const s = gsRef.current

      // BG fill
      ctx.fillStyle = '#0d0d0d'
      ctx.fillRect(0, 0, W, H)

      // Scrolling dot grid (parallax depth)
      const dot = 38
      ctx.fillStyle = 'rgba(255,255,255,0.042)'
      const off = (s.bgX % dot) | 0
      for (let dx = off - dot; dx < W; dx += dot) {
        for (let dy = dot / 2; dy < gY - 6; dy += dot) {
          ctx.beginPath(); ctx.arc(dx, dy, 1.3, 0, Math.PI * 2); ctx.fill()
        }
      }
      if (s.started && !s.dead) s.bgX += 0.9
      else s.bgX += 0.35   // gentle idle drift

      // Background wave
      drawWave(ctx, W, gY)

      // Drifting clouds (parallax, slower than obstacles)
      drawClouds(ctx, W, H, s.bgX * 0.38)

      // Game title
      drawTitle(ctx, W)

      // Section label
      ctx.save()
      ctx.font      = '400 9px Inter, sans-serif'
      ctx.fillStyle = 'rgba(255,255,255,0.35)'
      ctx.textAlign = 'left'
      ctx.fillText('SKILLS', 80, 106)
      ctx.restore()

      // Floor line
      ctx.save()
      ctx.strokeStyle = 'rgba(255,255,255,0.20)'
      ctx.lineWidth   = 1
      ctx.beginPath(); ctx.moveTo(60, gY); ctx.lineTo(W - 60, gY); ctx.stroke()
      // Subtle floor glow
      const fg = ctx.createLinearGradient(0, gY, 0, gY + 50)
      fg.addColorStop(0, 'rgba(255,255,255,0.05)')
      fg.addColorStop(1, 'rgba(0,0,0,0)')
      ctx.fillStyle = fg
      ctx.fillRect(60, gY, W - 120, 50)
      ctx.restore()

      // Idle / prompt
      if (!s.started) {
        drawChar(ctx, gY, 0, s.frame, false)
        ctx.save()
        ctx.font      = '500 13px Inter, sans-serif'
        ctx.textAlign = 'center'
        ctx.fillStyle = 'rgba(255,255,255,0.65)'
        ctx.fillText('SPACE  ·  TAP  to start', W / 2, gY - 100)
        ctx.restore()
        s.frame++
        rafRef.current = requestAnimationFrame(tick)
        return
      }

      if (!s.dead && !s.won) {
        // Physics
        s.vy += GRAVITY
        s.py -= s.vy
        if (s.py < 0) { s.py = 0; s.vy = 0 }

        s.speed = BASE_SPD + s.score * 0.014

        // Spawn
        if (--s.next <= 0) {
          const word = SKILL_WORDS[Math.floor(Math.random() * SKILL_WORDS.length)]
          s.obs.push({
            x: W + 20, h: Math.min(word.length * VSPACING + 4, 160),
            kw: word, lit: 0, passed: false,
          })
          s.ki++
          s.next = Math.floor(Math.max(54, 118 - s.score * 0.5) + Math.random() * 38)
        }

        // Move + score
        s.obs.forEach(o => {
          o.x -= s.speed
          if (o.lit > 0) o.lit--
          if (!o.passed && o.x + OBW < CHAR_X) {
            o.passed = true; o.lit = 54; s.score++
            if (s.score >= SKILL_WORDS.length) s.won = true
          }
        })
        s.obs = s.obs.filter(o => o.x > -80)

        // Collision (skip during invincibility frames)
        if (s.invincible === 0) {
          const px = CHAR_X + 4, py2 = gY - s.py - CH, pw = CW - 8
          for (const o of s.obs) {
            if (px < o.x + OBW - 3 && px + pw > o.x + 3 &&
                py2 < gY - 1 && py2 + CH > gY - o.h + 3) {
              s.lives--
              if (s.lives <= 0) { s.dead = true }
              else { s.invincible = 110 }
              break
            }
          }
        }
        if (s.invincible > 0) s.invincible--
        s.frame++
      }
      if (s.won) s.frame++

      s.obs.forEach(o => drawObs(ctx, o, gY))

      // Blink character during invincibility
      const blink = s.invincible > 0 && Math.floor(s.invincible / 5) % 2 === 1
      if (!blink) drawChar(ctx, gY, s.py, s.frame, s.dead)

      // Score
      ctx.save()
      ctx.font      = '400 11px Inter, sans-serif'
      ctx.textAlign = 'right'
      ctx.fillStyle = 'rgba(255,255,255,0.22)'
      ctx.fillText(`${s.score}`, W - 72, 46)

      // Lives (hearts)
      ctx.font      = '14px Inter, sans-serif'
      ctx.textAlign = 'right'
      for (let i = 0; i < 3; i++) {
        ctx.fillStyle = i < s.lives ? 'rgba(255,90,90,0.90)' : 'rgba(255,255,255,0.18)'
        ctx.fillText('♥', W - 72 - i * 20, 64)
      }
      ctx.restore()

      // Game over — text near title area, never overlaps obstacles
      if (s.dead) {
        ctx.save()
        ctx.font      = '700 15px Inter, sans-serif'
        ctx.textAlign = 'center'
        ctx.fillStyle = 'rgba(255,255,255,0.80)'
        ctx.fillText(`SCORE  ${s.score}`, W / 2, 128)
        ctx.font      = '400 11px Inter, sans-serif'
        ctx.fillStyle = 'rgba(255,255,255,0.45)'
        ctx.fillText('SPACE  ·  TAP  to restart', W / 2, 150)
        ctx.restore()
      }

      // Win screen + fireworks
      if (s.won) {
        // Spawn a new firework burst every 28 frames
        if (s.frame % 28 === 0) {
          spawnFirework(s.particles, 80 + Math.random() * (W - 160), 60 + Math.random() * (gY * 0.55))
        }

        // Update & draw particles
        for (let i = s.particles.length - 1; i >= 0; i--) {
          const p = s.particles[i]
          p.x  += p.vx
          p.y  += p.vy
          p.vy += 0.09
          p.vx *= 0.97
          p.life -= 0.016
          if (p.life <= 0) { s.particles.splice(i, 1); continue }
          ctx.save()
          ctx.globalAlpha = p.life
          ctx.fillStyle   = p.color
          ctx.beginPath(); ctx.arc(p.x, p.y, 3, 0, Math.PI * 2); ctx.fill()
          ctx.restore()
        }

        // Win text
        ctx.save()
        ctx.textAlign = 'center'
        ctx.font      = '700 22px Inter, sans-serif'
        ctx.fillStyle = '#c4ff23'
        ctx.shadowColor  = '#c4ff23'
        ctx.shadowBlur   = 18
        ctx.fillText('ALL SKILLS CLEARED!', W / 2, H / 2 - 24)
        ctx.shadowBlur   = 0
        ctx.font      = '400 12px Inter, sans-serif'
        ctx.fillStyle = 'rgba(255,255,255,0.65)'
        ctx.fillText(`SCORE  ${s.score}  ·  SPACE  ·  TAP  to play again`, W / 2, H / 2 + 10)
        ctx.restore()
      }

      rafRef.current = requestAnimationFrame(tick)
    }

    rafRef.current = requestAnimationFrame(tick)
    return () => { cancelAnimationFrame(rafRef.current); ro.disconnect() }
  }, [isActive])

  return (
    <canvas
      ref={canvasRef}
      style={{ display: 'block', width: '100%', height: '100%', cursor: 'pointer' }}
      onClick={jump}
    />
  )
}
