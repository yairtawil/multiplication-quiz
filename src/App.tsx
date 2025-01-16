import { useState } from 'react'
import Board, { BoardSize } from './Board/Board.tsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <Board size={BoardSize.Small} />
    </div>
  )
}

export default App
