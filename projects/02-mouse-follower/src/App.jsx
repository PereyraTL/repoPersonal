import { useEffect, useState } from 'react'

const FollowMouse = () => {
  const [enabled, setEnabled] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  // agregado para seguir caja roja
  const [score, setScore] = useState(0)
  const [targetPosition, setTargetPosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handlemove = (event) => {
      const { clientX, clientY } = event
      setPosition({ x: clientX, y: clientY })

      // Verificar si el cursor está sobre el cuadrado objetivo
      if (
        clientX > targetPosition.x &&
      clientX < targetPosition.x + 50 &&
      clientY > targetPosition.y &&
      clientY < targetPosition.y + 50
      ) {
      // Incrementar el puntaje y mover el cuadrado objetivo
        setScore((prevScore) => prevScore + 1)
        setTargetPosition(getRandomPosition())
      }
    }
    if (enabled) {
      window.addEventListener('pointermove', handlemove)
    }

    return () => {
      window.removeEventListener('pointermove', handlemove)
    }
  }, [enabled, targetPosition])

  const getRandomPosition = () => {
    const maxX = window.innerWidth - 50
    const maxY = window.innerHeight - 50
    const x = Math.floor(Math.random() * maxX)
    const y = Math.floor(Math.random() * maxY)
    return { x, y }
  }

  const handleButtonClick = () => {
    setEnabled(!enabled)
    setTargetPosition(getRandomPosition())
    setScore(0)
  }

  return (
    <>
      <div style={
        {
          position: 'absolute',
          backgroundColor: 'rgba(0,0,0,0.5)',
          border: '1px solid #fff',
          borderRadius: '50%',
          opacity: 0.8,
          pointerEvents: 'none',
          left: -25,
          top: -25,
          width: 50,
          height: 50,
          transform: `translate(${position.x}px, ${position.y}px)`
        }
      }
      />
      {enabled && (
        <div
          style={{
            position: 'absolute',
            backgroundColor: 'red',
            width: 50,
            height: 50,
            left: targetPosition.x,
            top: targetPosition.y
          }}
        />
      )}
      <div
        style={{
          position: 'absolute',
          top: 10,
          right: 10,
          color: '#fff',
          fontSize: 18
        }}
      >
        Puntaje: {score}
      </div>
      <button onClick={handleButtonClick}>
        {enabled ? 'Desactivar' : 'Activar'} seguir puntero
      </button>
    </>
  )
}

function App () {
  return (
    <main>
      <FollowMouse />
    </main>

  )
}

export default App
