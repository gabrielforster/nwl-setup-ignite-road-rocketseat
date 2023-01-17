import { Habit } from "./components/Habit"

function App() {
  return (
    <main className='min-h-screen flex flex-col justify-center items-center bg-zinc-800 text-white'>
      <h2>Hello from React</h2>
      <Habit completed={10} />
      <Habit completed={20} />
    </main>
  )
}

export default App
