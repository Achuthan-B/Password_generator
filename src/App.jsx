import { useCallback, useEffect, useRef, useState } from 'react';
import './App.css';

function App() {
  const [password, setPassword] = useState('');
  const [length, setlength] = useState(8);
  const [numbersAllowed, setNumbersAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);

  const passwordRef = useRef();

  const copyToClipboard = () => {
    window.navigator.clipboard.writeText(password);
    passwordRef.current.select();
  };

  const generatePassword = useCallback(() => {
    let tempPassword = '';
    let string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

    if (numbersAllowed) string += '0123456789';
    if (charAllowed) string += '!@#$%^&*()_-+=';

    for (let i = 0; i < length; i++) {
      const randomNumber = Math.floor(Math.random() * string.length + 1);
      tempPassword += string.charAt(randomNumber);
    }
    setPassword(tempPassword);
  }, [length, charAllowed, numbersAllowed]);

  useEffect(() => {
    generatePassword();
  }, [length, numbersAllowed, charAllowed]);

  return (
    <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500'>
      <h1 className='text-white text-center my-3'>Password generator</h1>
      <div className='flex shadow rounded-lg overflow-hidden mb-4'>
        <input
          className='outline-none w-full py-1 px-3'
          type='text'
          readOnly
          value={password}
          placeholder='Password'
          ref={passwordRef}
        />
        <button
          onClick={copyToClipboard}
          className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'
        >
          copy
        </button>
      </div>
      <div className='flex text-sm gap-x-2'>
        <div className='flex items-center gap-x-1'>
          <input
            type='range'
            min={6}
            max={100}
            className='cursor-pointer'
            value={length}
            onChange={(e) => setlength(e.target.value)}
          />
          <label htmlFor='length'>Length:{length}</label>
        </div>
        <div className='flex items-center gap-x-1'>
          <input
            type='checkbox'
            defaultChecked={numbersAllowed}
            onChange={() => setNumbersAllowed((prev) => !prev)}
          />
          <label htmlFor='numbersAllowed'>Numbers</label>
        </div>
        <div className='flex items-center gap-x-1'>
          <input
            type='checkbox'
            defaultChecked={charAllowed}
            onChange={() => setCharAllowed((prev) => !prev)}
          />
          <label htmlFor='charAllowed'>Special characters</label>
        </div>
      </div>
    </div>
  );
}

export default App;
