import { Container } from "@/components/container";
import { Outlet } from "react-router-dom";
import Header from "./header";
import Sidebar from "./sidebar";

const UserLayout = () => {
  return (
    <div className="bg-[#18191A]">
      <Header />
      <Container>
        <div className="mt-8 flex">
          <Sidebar />
          <div className="mx-8 hidden border-r border-r-slate-50/[0.06] xl:block" />
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
