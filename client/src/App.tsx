import { useState, DragEvent } from 'react'
import './App.css'
import CardContainer from './components/Card/CardContainer'
import { DroppableArea } from './components/Droppable/DroppableArea'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0"></meta>
      <div className='root'>
        <button onClick={() => setCount(count + 1)}>+1</button>
        {count}
        <CardContainer />
        <DroppableArea onTrigger={(event) => {
          event.dataTransfer.items[0].getAsString((data) => {
            console.log(data)
          })
        }}></DroppableArea>
      </div>
    </>
  )
}

export default App
