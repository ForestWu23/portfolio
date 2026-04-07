import { useRef, useEffect } from 'react'
import { createNoise3D } from 'simplex-noise'

interface AnimatedGradientProps {
  color1?: string
  color2?: string
  speed?: number
}

function hexToRgb(hex: string) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result
    ? { r: parseInt(result[1], 16), g: parseInt(result[2], 16), b: parseInt(result[3], 16) }
    : { r: 200, g: 180, b: 220 }
}

function lerp(a: number, b: number, t: number) {
  return a * (1 - t) + b * t
}

export default function AnimatedGradient({
  color1 = '#ecbef8',
  color2 = '#ffeab7',
  speed = 850,
}: AnimatedGradientProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animRef = useRef<number>(0)
  const clockRef = useRef(0)
  const inViewRef = useRef(true)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const noise3D = createNoise3D()
    const resolution = 110
    canvas.width = resolution
    canvas.height = resolution

    const c1 = hexToRgb(color1)
    const c2 = hexToRgb(color2)
    const cx = resolution / 2
    const cy = resolution / 2
    const imgData = ctx.getImageData(0, 0, resolution, resolution)
    const data = imgData.data
    const normFactor = (100 / resolution) / 100

    const rotate = (x: number, y: number, angle: number) => {
      const rad = (Math.PI / 180) * angle
      const cos = Math.cos(rad)
      const sin = Math.sin(rad)
      return cos * (x - cx) + sin * (y - cy) + cx
    }

    let containerW = canvas.parentElement?.clientWidth || window.innerWidth
    let containerH = canvas.parentElement?.clientHeight || window.innerHeight
    let aspectRatio = containerH / containerW
    let aspectMod = aspectRatio < 1
      ? { x: 1.4, y: 1.4 * aspectRatio }
      : { x: aspectRatio / 3, y: 1 }

    const onResize = () => {
      containerW = canvas.parentElement?.clientWidth || window.innerWidth
      containerH = canvas.parentElement?.clientHeight || window.innerHeight
      aspectRatio = containerH / containerW
      aspectMod = aspectRatio < 1
        ? { x: 1.4, y: 1.4 * aspectRatio }
        : { x: aspectRatio / 3, y: 1 }
    }
    window.addEventListener('resize', onResize)

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          inViewRef.current = entry.isIntersecting
        })
      },
      { rootMargin: '250px' }
    )
    observer.observe(canvas)

    const draw = () => {
      if (inViewRef.current) {
        const clock = clockRef.current
        const colorSpeed = 0.5

        for (let x = 0; x < resolution; x++) {
          for (let y = 0; y < resolution; y++) {
            const n = noise3D(
              (x / resolution) * aspectMod.x,
              (y / resolution) * aspectMod.y,
              clock / speed
            )

            const rotated = rotate(x, y, clock * colorSpeed)
            const blend = rotated * normFactor * 3.5 * n / 2
            const t = Math.max(0, Math.min(1, blend))

            const idx = 4 * (x + y * resolution)
            data[idx] = lerp(c1.r, c2.r, t)
            data[idx + 1] = lerp(c1.g, c2.g, t)
            data[idx + 2] = lerp(c1.b, c2.b, t)
            data[idx + 3] = 265 * n
          }
        }

        clockRef.current++
        ctx.putImageData(imgData, 0, 0)
      }

      animRef.current = requestAnimationFrame(draw)
    }

    canvas.classList.add('loaded')
    draw()

    return () => {
      cancelAnimationFrame(animRef.current)
      window.removeEventListener('resize', onResize)
      observer.disconnect()
    }
  }, [color1, color2, speed])

  return (
    <canvas
      ref={canvasRef}
      style={{
        width: '100%',
        height: '100%',
        position: 'relative',
      }}
    />
  )
}
