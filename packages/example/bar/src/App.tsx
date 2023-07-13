import { useState } from 'react'

function App() {
  const [count, setCount] = useState(10)
  return (
    <>
      <div className="flex justify-center items-center h-full gap-5 bg-neutral-200">
        <div
          className="text-gray-600"
          style={{
            color: 'yellow'
          }}
        >
          Example Bar
        </div>
        <div>{count}</div>
        <button
          onClick={() => {
            setCount(count + 1)
          }}
        >
          +1
        </button>
      </div>
    </>
  )
}

export default App
