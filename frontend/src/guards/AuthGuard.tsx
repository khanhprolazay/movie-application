import { useAppSelector } from "@/redux/hooks";
import { FC, ReactNode } from "react";
import AppContainer from "@/components/AppContainer";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { Button, Typography } from "@material-tailwind/react";
import { Link } from "react-router-dom";

type AuthGuardProps = {
  children: ReactNode;
};

const AuthGuard: FC<AuthGuardProps> = ({ children }) => {
  const {authenticated} = useAppSelector((state) => state.authentication);

  return authenticated ? (
    children
  ) : (
    <AppContainer className="flex w-full items-center justify-evenly">
      <div className="flex flex-col items-center">
        <ExclamationTriangleIcon className="mt-32 h-32 w-32 text-coral" />
        <Typography variant="h6" className="text-slate-200 font-medium">
          You dont have right to access to this page
        </Typography>
        <div className="mt-4 flex gap-4">
          <Link to="/home">
            <Button className="border-cred bg-transparent py-2 font-normal capitalize hover:border-cred">
              Go Home
            </Button>
          </Link>
          <Link to="/auth/login">
            <Button className="bg-cred py-2 font-normal capitalize text-slate-200 hover:border-cred">
              Login
            </Button>
          </Link>
        </div>
      </div>
    </AppContainer>
  );
};

export default AuthGuard;
