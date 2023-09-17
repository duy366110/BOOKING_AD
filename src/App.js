import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authReload } from "./store/store-auth";
import './App.css';

function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // KIỂM TRA NGƯỜI DÙNG ĐĂNG NHẬP
  useEffect(() => {
    let token = localStorage.getItem('token');

    if(!token) {
      navigate('/auth');

    } else {
      dispatch(authReload());

    }

  }, [])

  return (
    <Outlet />
  );
}

export default App;
