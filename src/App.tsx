import React, { useState } from "react";

function App() {
  const [username, setUsername] = useState<string>();
  const [password, setPassword] = useState<string>();

  return (
    <div className="h-screen w-screen flex flex-row items-center justify-center">
      <div className="">
        <form>
          <div>
            <label>
              Username:
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="border-[1px] border-black rounded-md"
              />
            </label>
          </div>
          <div>
            <label>
              Password:
              <input
                type="text"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border-[1px] border-black rounded-md"
              />
            </label>
          </div>
        </form>
        <button className="bg-slate-500 text-white rounded-md w-full">
          Log In
        </button>
      </div>
    </div>
  );
}

export default App;
