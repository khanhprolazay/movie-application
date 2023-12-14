import "./App.css";
import { getRoutersWithRole } from "./routes";
import { FC,  useEffect } from "react";
import AppLayout from "./components/AppLayout";
import { useAppDispatch, useAppSelector } from "./redux/hooks";
import { Navigate, Route, Routes } from "react-router-dom";
import authenticationActions from "./actions/authentication.action";
import AuthLayout from "./pages/auth/AuthLayout";
import AppAlert from "./components/AppAlert";
import 'react-lazy-load-image-component/src/effects/blur.css';
import { useGoogleOneTapLogin } from "@react-oauth/google";
import moviesActions from "./actions/movie.action";
import SingleLoginForm from "./pages/auth/components/SingleLoginForm";
import SingleRegisterForm from "./pages/auth/components/SingleRegisterForm";

const App: FC = () => {
  const dispatch = useAppDispatch();
  const { isLogin } = useAppSelector(state => state.authentication);

  useEffect(() => {
    dispatch(authenticationActions.check());
    dispatch(moviesActions.getMovieByRandom());
    dispatch(moviesActions.getMovieByDay(0, 20));
    dispatch(moviesActions.getMovieByComing(0, 20));
    dispatch(moviesActions.getMovieByRating(0, 20));
    dispatch(moviesActions.getMovieByRandomBackdrop());
  }, []);

  useGoogleOneTapLogin({
    disabled: isLogin,
    onSuccess: (credentialResponse) =>
      dispatch(
        authenticationActions.googleLogin({
          credential: credentialResponse.credential,
        }),
      ),
    onError: () => console.log("Error"),
  });

  return (
    <>
      <AppAlert />
      <Routes>
        <Route element={<AppLayout />}>
          {getRoutersWithRole(isLogin, "USER").map((route) => (
            <Route
              path={route.path}
              key={route.name}
              element={<route.element />}
            />
          ))}
        </Route>
        { !isLogin && (
          <Route path="/auth" element={<AuthLayout />}>
            <Route path="login" element={<SingleLoginForm />} />
            <Route path="register" element={<SingleRegisterForm />} />
          </Route>
        )}
        <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>
    </>
  );
};

export default App;
