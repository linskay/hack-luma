import { useState } from 'react'

export default function App() {
  const [count, setCount] = useState(0)
  return (
    <div className="container">
      <h1>Hahaton React + Vite</h1>
      <p>Монолит Spring Boot + фронтенд на React.</p>
      <button onClick={() => setCount((c) => c + 1)}>Кликнули {count} раз</button>
    </div>
  )
}
