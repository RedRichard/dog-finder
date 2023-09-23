import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import fetchData from "../../utils/fetchData";

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [error, setError] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);
  const [loggedIn, setLoggedIn] = useState<boolean>(false);

  const logIn = async () => {
    try {
      setLoading(true);
      await fetchData<{ name: string; email: string }>({
        endpoint: "/auth/login",
        body: {
          name: username,
          email: email,
        },
      });
      setLoggedIn(true);
    } catch (e) {
      setError("Please check your data");
      console.error("An error has occurred.", e);
    } finally {
      setLoading(false);
    }
  };

  // const logIn = async () => {
  //   setLoading(true);
  //   try {
  //     const res = await fetch(
  //       "https://frontend-take-home-service.fetch.com/auth/login",
  //       {
  //         method: "POST",
  //         mode: "cors",
  //         credentials: "include",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({
  //           name: username,
  //           email: email,
  //         }),
  //       }
  //     );

  //     if (res.ok) setLoggedIn(true);
  //     else throw new Error("Please check your data");
  //   } catch (err: unknown) {
  //     if (err instanceof Error) setError(err.message);
  //     else console.log("An error in the request has occurred.");
  //   }
  //   setLoading(false);
  // };

  useEffect(() => {
    if (loggedIn) navigate("/search");
  }, [loggedIn, navigate]);

  return (
    <div className="h-screen w-screen flex flex-row items-center justify-center">
      <div className="">
        <form>
          <div>
            <label htmlFor="username">
              Username:
              <input
                id="username"
                autoComplete="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="border-[1px] border-black rounded-md"
              />
            </label>
          </div>
          <div>
            <label htmlFor="email">
              Email:
              <input
                id="email"
                autoComplete="email"
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
        {loading && <div>Loading...</div>}
      </div>
    </div>
  );
};

export default Login;
