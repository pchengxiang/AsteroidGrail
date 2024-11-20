import { useState } from 'react'
import './App.css'
import CardContainer from './components/Card/CardContainer'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <button onClick={() => setCount(count + 1)}>+1</button>
       {count}
       <CardContainer />
    </div>
    </>
  )
}

export default App
