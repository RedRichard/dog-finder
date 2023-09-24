import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import fetchData from "../../utils/fetchData";
import loadingLogo from "../../assets/loading.svg";

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

  useEffect(() => {
    if (loggedIn) navigate("/search");
  }, [loggedIn, navigate]);

  return (
    <div className="h-screen w-screen flex flex-row items-center justify-center bg-royal-purple">
      {/* <div className="w-fit h-fit flex flex-col items-center"> */}
      <div className="bg-cornflower-blue w-screen h-fit mx-4 md:w-[40vw] lg:w-[30vw] rounded-md">
        <form
          className="h-full w-full p-8 text-white flex flex-col justify-center gap-2"
          onSubmit={async (e) => {
            e.preventDefault();
            await logIn();
          }}
        >
          <div className="flex flex-col">
            <label htmlFor="username">Username:</label>
            <input
              id="username"
              autoComplete="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="border-[1px] border-black rounded-md border-none text-black p-2"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="email">Email:</label>
            <input
              id="email"
              autoComplete="email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border-[1px] border-black rounded-md border-none text-black p-2"
            />
          </div>

          <button
            className="bg-slate-500 text-white rounded-md w-full"
            // onClick={logIn}
          >
            Log In
          </button>
        </form>
        {loading && (
          <div className="w-full flex flex-row justify-center mb-4">
            <img
              src={loadingLogo}
              className="animate-spin h-[10%] w-[10%] "
              alt="loading logo"
            />
          </div>
        )}
        {error && (
          <div className="py-2 text-center rounded-md w-full bg-red-500 text-white">
            {error}
          </div>
        )}
      </div>

      {/* </div> */}
    </div>
  );
};

export default Login;
