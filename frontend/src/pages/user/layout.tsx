import { Container } from "@/components/container";
import { Outlet } from "react-router-dom";
import Header from "./header";
import Sidebar from "./sidebar";

const UserLayout = () => {
  return (
    <div className="bg-[#18191A] xl:bg-[#424040]">
      <Header />
      <Container>
        <div className="flex min-h-[calc(100vh-53px)] bg-[#18191A] pt-8">
          <Sidebar />
          <div className="-mt-8 hidden border-r border-r-slate-50/[0.06] xl:block" />
          <main
            id="main"
            className="flex justify-around transition-all xl:block xl:opacity-100"
          >
            <Outlet />
          </main>
        </div>
      </Container>
    </div>
  );
};
export default UserLayout;
