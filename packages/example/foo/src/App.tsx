import ThemeSwitchButton from './components/theme-switch-button'

function App() {
  return (
    <>
      <div className="flex justify-center items-center h-full gap-5 bg-neutral-200">
        <div className="text-gray-600">Generate by generate-template-cli.</div>
        <div>
          <ThemeSwitchButton />
        </div>
      </div>
    </>
  )
}

export default App
