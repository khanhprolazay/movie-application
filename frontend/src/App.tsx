import "./App.css";
import { getRoutersWithRole } from "./routes";
import React, { FC,  useEffect } from "react";
import AppLayout from "./components/AppLayout";
import { useAppDispatch } from "./redux/hooks";
import { Navigate, Route, Routes } from "react-router-dom";
import authenticationActions from "./actions/authentication.action";
import AuthLayout from "./pages/auth/AuthLayout";
import AppAlert from "./components/AppAlert";
import Aos from "aos";

const LoginPage = React.lazy(() =>
  import("./pages/auth/components/SingleLoginForm").then(
    (LoginPage) => LoginPage,
  ),
);
const RegisterPage = React.lazy(() =>
  import("./pages/auth/components/SingleRegisterForm").then(
    (RegisterPage) => RegisterPage,
  ),
);

const App: FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    Aos.init();
    dispatch(authenticationActions.check());
  }, []);

  return (
    <>
      <AppAlert />
      <Routes>
        <Route element={<AppLayout />}>
          {getRoutersWithRole(true, "USER").map((route) => (
            <Route
              path={route.path}
              key={route.name}
              element={<route.element />}
            />
          ))}
        </Route>

        <Route path="/auth" element={<AuthLayout />}>
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
        </Route>

        <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>
    </>
  );
};

export default App;
