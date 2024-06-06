import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { AppRouter } from "./routes";

import { validateTokenSession } from "./service/auth/auth.service";
import { LocalStorageKeys } from "./utils/local-storage-keys";

import "./App.scss";
import { loginAction } from "./redux/slices/authSlice";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem(LocalStorageKeys.token);
    if (token) {
      validateTokenSession()
        .then((resp) => {
          if(!resp) return;
          dispatch(loginAction({user: resp, token }));
        })
        .catch((error) => console.error(error))
        .finally(() => setLoading(false))
    }else{
      setLoading(false);
    }
  }, [dispatch]);

  if (loading) return <div>Loading...</div>

  return <AppRouter />;
}

export default App;
