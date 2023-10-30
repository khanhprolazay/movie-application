import { Outlet } from "react-router-dom";
import { FC, Suspense } from "react";

const AuthLayout: FC = () => {
  return (
    <div className="relative flex h-screen w-screen bg-[url('@/assets/images/banner_bg01.jpg')] bg-cover bg-no-repeat">
      <main className="h-full w-full lg:w-5/12">
        <Suspense>
          <Outlet />
        </Suspense>
      </main>
    </div>
  );
};

export default AuthLayout;
