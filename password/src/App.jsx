import { useState ,useCallback,useEffect,useRef} from 'react'
import './App.css'

function App() {
  const[length,setLength]=useState(8);
    const[numberAllowed,setnumberAllowed]=useState(false);
    const[charAllowed,setcharAllowed]=useState(false);
    const[password,setPassword]=useState("");

    //REF HOOK

    const passwordRef=useRef(null)

    const copyPassword=useCallback(()=>{
      passwordRef.current?.select()
      passwordRef.current?.setSelectionRange(0,3);
      window.navigator.clipboard.writeText(password)


    },[password])

    const passwordGenerator=useCallback(()=>{
      let pass="";
      let str="QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm";
      if(numberAllowed) str+="01234567890";
      if(charAllowed) str+="!@#$%^&*()<>?:{}|,./;'[]\~`"
      for(let i=1;i<=length;i++){
        let char=Math.floor(Math.random()*str.length+1);
        pass+=str.charAt(char);
      }
      setPassword(pass);

      
    },[length,numberAllowed,charAllowed,setPassword])


    useEffect(()=>{
      passwordGenerator()
    },[length,numberAllowed,charAllowed,passwordGenerator])


  return (
    
    <>
    <div className='flex flex-col w-full mx-auto shadow-md rounded-lg px-6 py-2 text-orange-500 bg-gray-500'>
      <h1 className='text-4xl'>Password Generator</h1>
      
      <div className='w-full mx-auto shadow-md rounded-lg px-6 py-2  bg-gray-500'>
        <input type="text" value={password} className='outline-none w-full py-1 px-3' placeholder='password' readOnly ref={passwordRef}/>
        <button onClick={copyPassword} className='bg-blue-700 outline-none shrink-0 px-3 py-1 text-white'>copy</button>
      </div>
      <div className='flex text-sm gap-x-2'>
      <div className='flex items-center gap-x-1'>
        <input type="range" min={6} max={100} value={length} className="cursor-pointer"
        onChange={(e)=>{setLength(e.target.value)}}
        />
        <label>Length:{length}</label>
      </div>
      <div className='flex items-center gap-x-1'>
        <input type="checkbox" defaultChecked={numberAllowed} onChange={()=>{
          setnumberAllowed((prev)=>!prev);
        }} />
        <label >Numbers</label>




      </div>
      <div className='flex items-center gap-x-1'>
      <input type="checkbox" defaultChecked={charAllowed} onChange={()=>{
          setcharAllowed((prev)=>!prev);
        }} />
        <label >character</label>


      </div>



      </div>
        
      

      
      </div>
      </>
  )
}

export default App
