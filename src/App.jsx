import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import "./App.css";
import authService from "./appwrite/authService";
import { login, logout } from "./store/authSlice";
import { Outlet } from "react-router-dom";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService
      .getCurrentUser()
      .then((userData) => {
        console.log(userData, "userData");
        const payload = { userData };
        if (userData) {
          dispatch(login(payload));
        } else {
          dispatch(logout());
        }
      })
      .finally(() => setLoading(false));
  }, []);

  return;
  {
    loading ? (
      <p className="text-center">Loading...</p>
    ) : (
      <div className="min-h-screen flex flex-wrap content-between bg-gray-400">
        <div className="w-full block">
          <main>
            <h1> Mubashir </h1>
            <Outlet />
          </main>
        </div>
      </div>
    );
  }
}
export default App;
