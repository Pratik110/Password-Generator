import { useState, useCallback, useEffect, useRef } from 'react'

export default function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "~!@#$%^&*()_-+={}[]|`<>?/";

    for (let i = 1; i < length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char);
    }

    setPassword(pass)

  }, [length, numberAllowed, charAllowed, setPassword])

  const passwordRef = useRef(null);

  const copyPasswordToClip = useCallback(() => {
    // let textArea = document.querySelector("#mybox")

    // textArea.select();
    // navigator.clipboard.writeText(textArea.value);
    passwordRef.current?.select()
    passwordRef.current?.setSelectionRange(0, 25);
    window.navigator.clipboard.writeText(password)
    // alert("Password Copied")
  }, [password])

  useEffect(() => { passwordGenerator() }, [length, numberAllowed, charAllowed, passwordGenerator])
  return (
    <>
      <div className='w-full max-w-lg mx-auto shadow-md rounded-lg px-4 py-3 my-8 text-orange-500 bg-gray-800'>
        <h1 className='text-white text-center rounded-lg'>Password Generator</h1>
        <div className='flex shadow rounded-lg overflow-hidden mb-4'>
          <input
            // id='mybox'
            type="text"
            value={password}
            className='outline-none w-full py-1 px-3'
            placeholder='Password'
            readOnly
            ref={passwordRef}
          />
          <button onClick={copyPasswordToClip} className='outline-none bg-blue-700 text-white text-center px-3 py-0.5 shrink-0'>Copy</button>
        </div>
        <div className='flex text-sm gap-x-2 justify-center'>
          <div className='flex items-center gap-x-1'>
            <input
              type="range"
              min={6}
              max={24}
              value={length}
              className='cursor-pointer'
              onChange={(e) => { setLength(e.target.value) }}
            />
            <label htmlFor="">Length : {length}</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input
              type="checkbox"
              defaultChecked={numberAllowed}
              className='cursor-pointer'
              id="numberInput"
              onChange={() => { setNumberAllowed(checked => !checked) }} />
            <label htmlFor="">Numbers</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input
              type="checkbox"
              defaultChecked={charAllowed}
              className='cursor-pointer'
              id="charInput"
              onChange={() => { setCharAllowed(checked => !checked) }} />
            <label htmlFor="">Characters</label>
          </div>
        </div>
      </div>
    </>
  )
}