interface HabitProps {
  completed: number
}

export function Habit({completed}: HabitProps){
  return (
    <p className="h-10 w-10 m-4 bg-black text-white grid place-items-center">
      {completed}
    </p>
  )
}