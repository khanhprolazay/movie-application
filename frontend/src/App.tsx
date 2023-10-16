import "./App.css";
import { FC, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import UserLayout from "./pages/user/layout";
import { ChangePasswordForm, ProfileForm } from "./pages/user/profile";
import { HomePage } from "./pages/home.page";
import { DetailPage } from "./pages/detail.page";
import { SearchPage } from "./pages/search.page";
import authenticationActions from "./actions/authentication.action";
import { useAppDispatch } from "./redux/hooks";
import { AuthLayout, SingleLoginForm, SingleRegisterForm } from "./pages/auth";
import AppAlert from "./components/AppAlert";
import HistoryPage from "./pages/user/history";

const App: FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(authenticationActions.check());
  }, []);

  return (
    <>
      <AppAlert />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="detail" element={<DetailPage />} />
        <Route path="search" element={<SearchPage />} />

        <Route path="/auth" element={<AuthLayout />}>
          <Route path="login" element={<SingleLoginForm />} />
          <Route path="register" element={<SingleRegisterForm />} />
          <Route />
        </Route>

        <Route path="/user" element={<UserLayout />}>
          <Route path="save" element={<ProfileForm />} />
          <Route path="history" element={<HistoryPage />} />
          <Route path="setting" element={<ProfileForm />} />
          <Route path="profile" element={<ProfileForm />} />
          <Route path="favorite" element={<ProfileForm />} />
          <Route path="subcription" element={<ProfileForm />} />
          <Route path="change-password" element={<ChangePasswordForm />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
