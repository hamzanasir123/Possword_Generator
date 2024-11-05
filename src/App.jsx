import { useState, useCallback, useEffect, useRef } from 'react'
import './App.css'

function App() {
  const [lenght, setLenght] = useState(8);;
  const [numberAlow, setNumberAllow] = useState(false);
  const [charachter, setCharachter] = useState(false);
  const [possword, setPossword] = useState("");
  const posswordRef = useRef(null);


  const posswordGenerator = useCallback(() => {
    let poss = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    
    if(numberAlow){
      str += "0123456789"
    }
    if(charachter){
      str += "!@#$%^&*-_=+[]{}~`"
    }

    for(let i = 1; i <= lenght; i++){
      let char = Math.floor(Math.random() * str.length + 1)
      poss += str.charAt(char)
    }
    setPossword(poss)



  }, [lenght, numberAlow, charachter, setPossword])

  const copyPosswordToClipBoard = useCallback(() => {
    posswordRef.current?.select();
    // posswordRef.current?.setSelectionRange(0,15);   
    window.navigator.clipboard.writeText(possword); 
  }, [possword])

  useEffect(() => {
    posswordGenerator()
  }, [lenght,numberAlow,charachter,posswordGenerator])
  return (
    
     <div className='w-full max-w-md mx-auto shadow-md
     rounded-lg px-4  text-black-500 bg-gray-700'>
      <h1 className='text-white 
      text-justify mt-11 '><b><i>Possword Generator</i></b></h1>
      <div
      className='w-full h-20 max-w-md mx-auto shadow-md mt-19
     rounded-lg px-4 my-8 text-black-500 bg-gray-700'
      >
        <input type="text"
        value={possword}
        className='outline-none w-full py-1 px-3 mt-0 rounded-xl'
        placeholder='Possword'
        readOnly
        ref={posswordRef}
        />
        <button
        
        onClick={copyPosswordToClipBoard}
        className='outline-none bg-blue-700 text-white
        px-3 py-0.5 shrink-0 rounded-lg mt-3   '>Copy</button>
      </div>
      <div className='flex text-sm gap-x-2'>
        <div  className='flex items-center gap-x-1'>
          <input type='range'
          min={6}
          max={100}
          value={lenght}
          className='cursor-pointer  '
          onChange={(e) => {setLenght(e.target.value)}}
          />
            <label
            className='text-white'>Lenght : {lenght}</label>          
        </div>
        <div className='flex items-center gap-x-1'>
        <input
         type="checkbox"
         defaultChecked = {numberAlow}
         id='numberinput'
         onChange={() => {
          setNumberAllow((prev) => !prev)
         }} 
         />
         <label htmlFor='numberInput'
         className='text-white'>Numbers</label>
        </div>
        <div className='flex items-center gap-x-1'>
        <input
         type="checkbox"
         defaultChecked = {charachter}
         id='charachterinput'
         onChange={() => {
          setCharachter((prev) => !prev)
         }} 
         />
         <label htmlFor='charachterinput'
         className='text-white'>Charachter</label>
        </div>
      </div>
     </div>
    
  )
}

export default App
