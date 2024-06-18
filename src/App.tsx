import { useState } from 'react'
import './App.css'
import IconPickerComponent from './components/IconPickerComponent'
import { icons } from './components/Icon';

function App() {
  const [currentIcon, setCurrentIcon] = useState<string | null>('activity')
  const IconComponent = icons[currentIcon!];
  const [open, setOpen] = useState(false)
  return (
    <div className='w-full'>
    <h1 className="text-3xl font-bold text-pink-600 text-center">
      Utilize IconPicker Assignment
    </h1>
    <div className='flex items-center justify-center cursor-pointer my-4'>
    <img onClick={()=>{
      !open && setOpen(true)
      }} src={IconComponent} className={`bg-blue-500 p-2 rounded-md hover:outline outline-2 outline-offset-2`} alt={currentIcon!} width={"100px"} height={"100px"} />
    </div>
    {
      open && (
        <IconPickerComponent rowsInOnePage={5} columnsInOnePage={9} iconHeight='50px' iconWidth='50px' 
        pickerHeight='500px' pickerWidth='500px' setOpen={setOpen} setCurrentIcon={setCurrentIcon} />
      )
    }
    </div>
  )
}

export default App
