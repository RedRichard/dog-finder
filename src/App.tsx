import React, { useState } from "react";

function App() {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [error, setError] = useState<string>();

  const logIn = async () => {
    try {
      const res = await fetch(
        "https://frontend-take-home-service.fetch.com/auth/login",
        {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: username,
            email: email,
          }),
        }
      );

      if (!res.ok) throw new Error("Please check your data");
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
    }
  };

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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border-[1px] border-black rounded-md"
              />
            </label>
          </div>
        </form>
        <button
          className="bg-slate-500 text-white rounded-md w-full"
          onClick={logIn}
        >
          Log In
        </button>
        {error && <div className="w-full bg-red-500 text-white">{error}</div>}
      </div>
    </div>
  );
}

export default App;
