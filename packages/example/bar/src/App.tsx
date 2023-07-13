import ThemeSwitchButton from './components/theme-switch-button'
import { useState } from 'react'
function App() {
  const [count, setCount] = useState(0)
  return (
    <>
      <div className="flex justify-center items-center h-full gap-5 bg-neutral-200">
        <div className="text-gray-600">Generate by generate-template-cli.</div>
        <div>
          <ThemeSwitchButton />
          {count}
          <button
            onClick={() => {
              setCount(count + 1)
            }}
          >
            +1
          </button>
        </div>
      </div>
    </>
  )
}

export default App
