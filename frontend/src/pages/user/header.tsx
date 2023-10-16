import { Container } from "@/components/container";
import { Typography } from "@material-tailwind/react";
import { FC } from "react";

const Header: FC = () => {
  return (
    <header className="min-h-[52px] max-h-[52px] w-full border-b border-b-slate-50/[0.06] bg-[#242526]">
      <Container>
        <div className="my-1 flex h-11 w-full items-center">
          <Typography className="font-manrope text-2xl font-bold text-slate-200">
            HEADER
          </Typography>
        </div>
      </Container>
    </header>
  );
};

export default Header;
