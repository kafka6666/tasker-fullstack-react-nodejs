import './index.css';
import { Button } from "@/components/ui/button";

function App() {
  return (
    <div>
      <h1 className="text-3xl font-bold underline">Tasker App</h1>
      <Button 
        variant="outline"
        className='text-black bg-blue-700 hover:cursor-pointer hover:border-ring-orange'
      >
        Click me
      </Button>
    </div>
  )
}

export default App
