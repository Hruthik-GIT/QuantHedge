import React, { useEffect, useRef } from 'react'

const AnimatedGlobe = () => {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    let animationId
    let rotation = 0

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    // Globe properties - Large and prominent
    const globe = {
      x: canvas.width * 0.5,
      y: canvas.height * 0.5,
      radius: Math.min(canvas.width, canvas.height) * 0.22,
    }

    // Update globe size on resize
    const updateGlobe = () => {
      globe.x = canvas.width * 0.5
      globe.y = canvas.height * 0.5
      globe.radius = Math.min(canvas.width, canvas.height) * 0.22
    }

    // Create multiple orbital rings with different orientations (like in the image)
    const orbitalRings = []
    const ringConfigs = [
      { radius: 1.4, tiltX: 0, tiltY: 0, tiltZ: 0, speed: 0.003, particles: 80 },
      { radius: 1.6, tiltX: 60, tiltY: 0, tiltZ: 0, speed: 0.002, particles: 90 },
      { radius: 1.8, tiltX: 0, tiltY: 60, tiltZ: 0, speed: 0.0025, particles: 100 },
      { radius: 2.0, tiltX: 30, tiltY: 30, tiltZ: 0, speed: 0.0015, particles: 110 },
      { radius: 2.2, tiltX: 0, tiltY: 0, tiltZ: 45, speed: 0.002, particles: 120 },
      { radius: 2.4, tiltX: 45, tiltY: 45, tiltZ: 0, speed: 0.001, particles: 130 },
    ]

    ringConfigs.forEach(config => {
      const ring = {
        radius: globe.radius * config.radius,
        tiltX: config.tiltX * Math.PI / 180,
        tiltY: config.tiltY * Math.PI / 180,
        tiltZ: config.tiltZ * Math.PI / 180,
        speed: config.speed,
        particles: []
      }

      // Create particles for this ring
      for (let i = 0; i < config.particles; i++) {
        ring.particles.push({
          angle: (i / config.particles) * Math.PI * 2,
          opacity: Math.random() * 0.6 + 0.4,
          size: Math.random() * 1.5 + 0.8
        })
      }

      orbitalRings.push(ring)
    })

    // Create particle-based continents
    const continentParticles = []
    const continentData = [
      { name: 'North America', centerLat: 45, centerLon: -100, particles: [] },
      { name: 'South America', centerLat: -15, centerLon: -60, particles: [] },
      { name: 'Europe', centerLat: 50, centerLon: 10, particles: [] },
      { name: 'Africa', centerLat: 0, centerLon: 20, particles: [] },
      { name: 'Asia', centerLat: 35, centerLon: 100, particles: [] },
      { name: 'Australia', centerLat: -25, centerLon: 135, particles: [] }
    ]

    // Generate particles for each continent
    continentData.forEach(continent => {
      const numParticles = 120
      for (let i = 0; i < numParticles; i++) {
        const latOffset = (Math.random() - 0.5) * 35
        const lonOffset = (Math.random() - 0.5) * 50
        
        const lat = (continent.centerLat + latOffset) * Math.PI / 180
        const lon = (continent.centerLon + lonOffset) * Math.PI / 180
        
        continentParticles.push({
          lat,
          lon,
          x: 0,
          y: 0,
          z: 0,
          visible: true,
          opacity: Math.random() * 0.8 + 0.5,
          size: Math.random() * 2.5 + 1,
          pulsePhase: Math.random() * Math.PI * 2
        })
      }
    })

    // Enhanced data connections with curved paths
    const dataConnections = [
      { from: 0, to: 2, packets: [], color: [0, 255, 255] }, // North America to Europe - Cyan
      { from: 2, to: 4, packets: [], color: [255, 100, 255] }, // Europe to Asia - Magenta
      { from: 4, to: 5, packets: [], color: [100, 255, 100] }, // Asia to Australia - Green
      { from: 1, to: 3, packets: [], color: [255, 255, 100] }, // South America to Africa - Yellow
      { from: 0, to: 4, packets: [], color: [255, 150, 0] }, // North America to Asia - Orange
      { from: 2, to: 3, packets: [], color: [150, 255, 255] }, // Europe to Africa - Light Cyan
      { from: 0, to: 1, packets: [], color: [255, 200, 200] }, // North America to South America - Pink
      { from: 3, to: 4, packets: [], color: [200, 200, 255] }, // Africa to Asia - Light Blue
    ]

    // Initialize data packets for each connection
    dataConnections.forEach(connection => {
      for (let i = 0; i < 4; i++) {
        connection.packets.push({
          progress: Math.random(),
          speed: 0.006 + Math.random() * 0.008,
          opacity: Math.random() * 0.8 + 0.6,
          size: Math.random() * 3 + 2,
          trail: []
        })
      }
    })

    // Grid lines for the globe
    const gridLines = { latitude: [], longitude: [] }
    for (let lat = -75; lat <= 75; lat += 15) {
      gridLines.latitude.push(lat * Math.PI / 180)
    }
    for (let lon = 0; lon < 360; lon += 15) {
      gridLines.longitude.push(lon * Math.PI / 180)
    }

    // Stars background
    const stars = []
    for (let i = 0; i < 300; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 0.3,
        opacity: Math.random() * 0.8 + 0.2,
        twinklePhase: Math.random() * Math.PI * 2
      })
    }

    // Helper function to rotate point in 3D
    const rotate3D = (x, y, z, rotX, rotY, rotZ) => {
      // Rotate around X axis
      let newY = y * Math.cos(rotX) - z * Math.sin(rotX)
      let newZ = y * Math.sin(rotX) + z * Math.cos(rotX)
      y = newY
      z = newZ

      // Rotate around Y axis
      let newX = x * Math.cos(rotY) + z * Math.sin(rotY)
      newZ = -x * Math.sin(rotY) + z * Math.cos(rotY)
      x = newX
      z = newZ

      // Rotate around Z axis
      newX = x * Math.cos(rotZ) - y * Math.sin(rotZ)
      newY = x * Math.sin(rotZ) + y * Math.cos(rotZ)

      return { x: newX, y: newY, z: newZ }
    }

    const animate = (time) => {
      updateGlobe()
      
      // Clear canvas with deep space background
      const bgGradient = ctx.createRadialGradient(
        canvas.width * 0.5, canvas.height * 0.5, 0,
        canvas.width * 0.5, canvas.height * 0.5, Math.max(canvas.width, canvas.height)
      )
      bgGradient.addColorStop(0, '#001133')
      bgGradient.addColorStop(1, '#000511')
      ctx.fillStyle = bgGradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Draw stars
      stars.forEach(star => {
        const twinkle = Math.sin(time * 0.003 + star.twinklePhase) * 0.3 + 0.7
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity * twinkle})`
        ctx.beginPath()
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2)
        ctx.fill()
      })

      rotation += 0.004

      // Draw enhanced orbital rings with dotted paths
      orbitalRings.forEach((ring, ringIndex) => {
        // Draw the orbital path as dotted line
        ctx.strokeStyle = `rgba(0, 200, 255, 0.4)`
        ctx.lineWidth = 1
        ctx.setLineDash([3, 6])
        ctx.beginPath()

        let firstPoint = true
        for (let angle = 0; angle <= Math.PI * 2; angle += 0.1) {
          const x = ring.radius * Math.cos(angle)
          const y = 0
          const z = ring.radius * Math.sin(angle)
          
          const rotated = rotate3D(x, y, z, ring.tiltX, ring.tiltY, ring.tiltZ + time * ring.speed)
          const screenX = globe.x + rotated.x
          const screenY = globe.y + rotated.y
          
          if (rotated.z > -ring.radius * 0.7) {
            if (firstPoint) {
              ctx.moveTo(screenX, screenY)
              firstPoint = false
            } else {
              ctx.lineTo(screenX, screenY)
            }
          } else {
            firstPoint = true
          }
        }
        ctx.stroke()
        ctx.setLineDash([])

        // Draw particles on the orbital ring
        ring.particles.forEach(particle => {
          particle.angle += ring.speed
          
          const x = ring.radius * Math.cos(particle.angle)
          const y = 0
          const z = ring.radius * Math.sin(particle.angle)
          
          const rotated = rotate3D(x, y, z, ring.tiltX, ring.tiltY, ring.tiltZ + time * ring.speed)
          const screenX = globe.x + rotated.x
          const screenY = globe.y + rotated.y
          
          if (rotated.z > -ring.radius * 0.5) {
            const depth = (rotated.z + ring.radius) / (2 * ring.radius)
            const opacity = particle.opacity * depth * 0.8
            
            ctx.fillStyle = `rgba(0, 220, 255, ${opacity})`
            ctx.shadowColor = 'rgba(0, 220, 255, 0.8)'
            ctx.shadowBlur = 4
            ctx.beginPath()
            ctx.arc(screenX, screenY, particle.size, 0, Math.PI * 2)
            ctx.fill()
            ctx.shadowBlur = 0
          }
        })
      })

      // Update continent particle positions
      continentParticles.forEach(particle => {
        const adjustedLon = particle.lon + rotation
        const sinLat = Math.sin(particle.lat)
        const cosLat = Math.cos(particle.lat)
        const sinLon = Math.sin(adjustedLon)
        const cosLon = Math.cos(adjustedLon)
        
        particle.x = globe.x + globe.radius * cosLat * cosLon
        particle.y = globe.y + globe.radius * sinLat
        particle.z = globe.radius * cosLat * sinLon
        particle.visible = particle.z > -globe.radius * 0.2
      })

      // Draw enhanced data transfer connections
      dataConnections.forEach(connection => {
        const fromContinent = continentData[connection.from]
        const toContinent = continentData[connection.to]
        
        const fromLat = fromContinent.centerLat * Math.PI / 180
        const fromLon = (fromContinent.centerLon * Math.PI / 180) + rotation
        const toLat = toContinent.centerLat * Math.PI / 180
        const toLon = (toContinent.centerLon * Math.PI / 180) + rotation
        
        const fromX = globe.x + globe.radius * Math.cos(fromLat) * Math.cos(fromLon)
        const fromY = globe.y + globe.radius * Math.sin(fromLat)
        const fromZ = globe.radius * Math.cos(fromLat) * Math.sin(fromLon)
        
        const toX = globe.x + globe.radius * Math.cos(toLat) * Math.cos(toLon)
        const toY = globe.y + globe.radius * Math.sin(toLat)
        const toZ = globe.radius * Math.cos(toLat) * Math.sin(toLon)
        
        if (fromZ > -globe.radius * 0.3 && toZ > -globe.radius * 0.3) {
          // Draw enhanced connection line with gradient
          const gradient = ctx.createLinearGradient(fromX, fromY, toX, toY)
          gradient.addColorStop(0, `rgba(${connection.color[0]}, ${connection.color[1]}, ${connection.color[2]}, 0.8)`)
          gradient.addColorStop(0.5, `rgba(${connection.color[0]}, ${connection.color[1]}, ${connection.color[2]}, 1)`)
          gradient.addColorStop(1, `rgba(${connection.color[0]}, ${connection.color[1]}, ${connection.color[2]}, 0.8)`)
          
          ctx.strokeStyle = gradient
          ctx.lineWidth = 2
          ctx.setLineDash([8, 4])
          ctx.beginPath()
          ctx.moveTo(fromX, fromY)
          ctx.lineTo(toX, toY)
          ctx.stroke()
          ctx.setLineDash([])
          
          // Draw enhanced data packets with trails
          connection.packets.forEach(packet => {
            packet.progress += packet.speed
            if (packet.progress > 1) {
              packet.progress = 0
              packet.trail = []
            }
            
            const packetX = fromX + (toX - fromX) * packet.progress
            const packetY = fromY + (toY - fromY) * packet.progress
            
            // Add to trail
            packet.trail.push({ x: packetX, y: packetY })
            if (packet.trail.length > 8) packet.trail.shift()
            
            // Draw trail
            packet.trail.forEach((point, index) => {
              const trailOpacity = (index / packet.trail.length) * packet.opacity * 0.5
              ctx.fillStyle = `rgba(${connection.color[0]}, ${connection.color[1]}, ${connection.color[2]}, ${trailOpacity})`
              ctx.beginPath()
              ctx.arc(point.x, point.y, packet.size * (index / packet.trail.length), 0, Math.PI * 2)
              ctx.fill()
            })
            
            // Draw main packet with enhanced glow
            ctx.shadowColor = `rgba(${connection.color[0]}, ${connection.color[1]}, ${connection.color[2]}, 1)`
            ctx.shadowBlur = 12
            ctx.fillStyle = `rgba(${connection.color[0]}, ${connection.color[1]}, ${connection.color[2]}, ${packet.opacity})`
            ctx.beginPath()
            ctx.arc(packetX, packetY, packet.size, 0, Math.PI * 2)
            ctx.fill()
            
            // Bright center
            ctx.shadowBlur = 0
            ctx.fillStyle = `rgba(255, 255, 255, ${packet.opacity * 0.9})`
            ctx.beginPath()
            ctx.arc(packetX, packetY, packet.size * 0.4, 0, Math.PI * 2)
            ctx.fill()
          })
        }
      })

      // Draw globe grid lines
      ctx.strokeStyle = 'rgba(0, 200, 255, 0.5)'
      ctx.lineWidth = 1

      gridLines.latitude.forEach(lat => {
        ctx.beginPath()
        let firstPoint = true
        for (let lon = 0; lon <= Math.PI * 2; lon += 0.1) {
          const adjustedLon = lon + rotation
          const x = globe.x + globe.radius * Math.cos(lat) * Math.cos(adjustedLon)
          const y = globe.y + globe.radius * Math.sin(lat)
          const z = globe.radius * Math.cos(lat) * Math.sin(adjustedLon)
          
          if (z > -globe.radius * 0.3) {
            if (firstPoint) {
              ctx.moveTo(x, y)
              firstPoint = false
            } else {
              ctx.lineTo(x, y)
            }
          } else {
            firstPoint = true
          }
        }
        ctx.stroke()
      })

      gridLines.longitude.forEach(lon => {
        ctx.beginPath()
        let firstPoint = true
        for (let lat = -Math.PI/2; lat <= Math.PI/2; lat += 0.1) {
          const adjustedLon = lon + rotation
          const x = globe.x + globe.radius * Math.cos(lat) * Math.cos(adjustedLon)
          const y = globe.y + globe.radius * Math.sin(lat)
          const z = globe.radius * Math.cos(lat) * Math.sin(adjustedLon)
          
          if (z > -globe.radius * 0.3) {
            if (firstPoint) {
              ctx.moveTo(x, y)
              firstPoint = false
            } else {
              ctx.lineTo(x, y)
            }
          } else {
            firstPoint = true
          }
        }
        ctx.stroke()
      })

      // Draw continent particles
      continentParticles.forEach(particle => {
        if (particle.visible) {
          const pulse = Math.sin(time * 0.008 + particle.pulsePhase) * 0.4 + 0.8
          const opacity = particle.opacity * pulse
          const size = particle.size + pulse * 0.8
          
          ctx.shadowColor = 'rgba(0, 255, 200, 1)'
          ctx.shadowBlur = 6
          ctx.fillStyle = `rgba(0, 255, 200, ${opacity})`
          ctx.beginPath()
          ctx.arc(particle.x, particle.y, size, 0, Math.PI * 2)
          ctx.fill()
          
          ctx.shadowBlur = 0
          ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`
          ctx.beginPath()
          ctx.arc(particle.x, particle.y, size * 0.4, 0, Math.PI * 2)
          ctx.fill()
        }
      })

      // Draw globe outline with enhanced glow
      ctx.strokeStyle = 'rgba(0, 255, 255, 1)'
      ctx.lineWidth = 3
      ctx.shadowColor = 'rgba(0, 255, 255, 0.8)'
      ctx.shadowBlur = 20
      ctx.beginPath()
      ctx.arc(globe.x, globe.y, globe.radius, 0, Math.PI * 2)
      ctx.stroke()
      ctx.shadowBlur = 0

      // Enhanced outer glow
      const glowGradient = ctx.createRadialGradient(
        globe.x, globe.y, globe.radius * 0.8,
        globe.x, globe.y, globe.radius * 2.2
      )
      glowGradient.addColorStop(0, 'rgba(0, 200, 255, 0)')
      glowGradient.addColorStop(0.6, 'rgba(0, 200, 255, 0.2)')
      glowGradient.addColorStop(1, 'rgba(0, 100, 255, 0.05)')
      
      ctx.fillStyle = glowGradient
      ctx.beginPath()
      ctx.arc(globe.x, globe.y, globe.radius * 2.2, 0, Math.PI * 2)
      ctx.fill()

      animationId = requestAnimationFrame(animate)
    }

    animate(0)

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      if (animationId) {
        cancelAnimationFrame(animationId)
      }
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 1,
        pointerEvents: 'none',
        background: 'transparent'
      }}
    />
  )
}

export default AnimatedGlobe