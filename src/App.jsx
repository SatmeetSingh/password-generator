import { useState, useCallback, useEffect, useRef } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numberAllowed) {
      str += "0123456789";
    }
    if (charAllowed) {
      str += "#$%&'()*,+-./";
    }

    for (let i = 1; i < length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [length, numberAllowed, charAllowed, setPassword]);

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 101);
    window.navigator.clipboard.writeText(password);
  }, [password]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charAllowed, passwordGenerator]);

  return (
    <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 bg-gray-300">
      <h1 className="text-center text-black my-10 text-xl font-semibold ">
        Password Generator
      </h1>
      <div className="flex items-center justify-center mt-4 ">
        <input
          type="text"
          value={password}
          placeholder="password"
          readOnly
          ref={passwordRef}
          className="px-3 py-1 outline-none w-full rounded-l-lg"
        />
        <button
          onClick={copyPasswordToClipboard}
          className="text-white  bg-blue-700 px-3 py-1 outline-none shrink-0 rounded-r-lg"
        >
          copy
        </button>
      </div>
      <div className="flex items-center justify-center text-black mt-5  text-xl font-semibold  ">
        <input
          type="range"
          min={6}
          max={100}
          value={length}
          onChange={(e) => setLength(e.target.value)}
          className="cursor-pointer w-full "
        />
        <label className="mr-3">Length:{length}</label>
        <input
          type="checkbox"
          defaultChecked={numberAllowed}
          id="numberInput"
          onChange={() => setNumberAllowed((prev) => !prev)}
        />
        <label htmlFor="numberInput" className="mr-3">
          Numbers
        </label>
        <input
          type="checkbox"
          defaultChecked={charAllowed}
          id="charInput"
          onChange={() => setCharAllowed((prev) => !prev)}
        />
        <label htmlFor="charInput">Characters</label>
      </div>
    </div>
  );
}

export default App;
