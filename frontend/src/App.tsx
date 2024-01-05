import "./App.css";
import { getRoutersWithRole } from "./routes";
import { FC,  useEffect, useLayoutEffect } from "react";
import AppLayout from "./components/AppLayout";
import { useAppDispatch, useAppSelector } from "./redux/hooks";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import authenticationActions from "./actions/authentication.action";
import AuthLayout from "./pages/auth/AuthLayout";
import AppAlert from "./components/AppAlert";
import 'react-lazy-load-image-component/src/effects/blur.css';
import { useGoogleOneTapLogin } from "@react-oauth/google";
import moviesActions from "./actions/movie.action";
import SingleLoginForm from "./pages/auth/components/SingleLoginForm";
import SingleRegisterForm from "./pages/auth/components/SingleRegisterForm";
import genreActions from "./actions/genre.action";

const App: FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { authenticated } = useAppSelector(state => state.authentication);

  useEffect(() => {
    dispatch(genreActions.getGenres());
    dispatch(authenticationActions.check());
    dispatch(moviesActions.getMovieByRandom());
    dispatch(moviesActions.getMovieByDay(0, 20));
    dispatch(moviesActions.getMovieByComing(0, 20));
    dispatch(moviesActions.getMovieByRating(0, 20));
    dispatch(moviesActions.getMovieByRandomBackdrop());
  }, []);

  useGoogleOneTapLogin({
    disabled: authenticated,
    onSuccess: (credentialResponse) =>
      dispatch(
        authenticationActions.googleLogin({
          credential: credentialResponse.credential,
        }),
      ),
    onError: () => console.log("Error"),
  });

  useLayoutEffect(() => {
    const hash = window.location.hash;
    const redirect = localStorage.getItem("redirect");

    if (!authenticated && hash && hash !== "#/home") 
      localStorage.setItem("redirect", hash);

    if (authenticated && redirect) {
      navigate(redirect);
      localStorage.removeItem("redirect"); 
    }

  }, [authenticated])

  return (
    <>
      <AppAlert />
      <Routes>
        <Route element={<AppLayout />}>
          {getRoutersWithRole(authenticated, "USER").map((route) => (
            <Route
              path={route.path}
              key={route.name}
              element={<route.element />}
            />
          ))}
        </Route>
        { !authenticated && (
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
