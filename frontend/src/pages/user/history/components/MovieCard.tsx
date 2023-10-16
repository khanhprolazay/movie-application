import {
  Avatar,
  Card,
  CardBody,
  CardHeader,
  Rating,
  Typography,
} from "@material-tailwind/react";
import { FC } from "react";

const MovieCard: FC = () => {
  return (
    <Card
      shadow={false}
      className="h-fit w-full cursor-pointer rounded-md transition duration-300 ease-in-out hover:-translate-y-2 hover:bg-opacity-70 "
    >
      <CardBody className="m-0 flex h-[236px] w-full flex-col justify-end rounded-none bg-transparent bg-[url('https://www.cgv.vn/media/catalog/product/cache/1/image/c5f0a1eff4c394a251036189ccddaacd/7/0/700x1000-oppen.jpg')] bg-cover bg-top bg-no-repeat p-0 md:h-[248px] lg:h-[264px]">
        <div className="mx-2 bg-slate-950 bg-opacity-50 py-2">
          <Typography
            variant="h5"
            className="line-clamp-1 font-manrope text-sm text-slate-200"
          >
            Oppenheimer
          </Typography>
          <Typography className="font-manrope text-xs text-slate-300">
            104 min
          </Typography>
        </div>
      </CardBody>
    </Card>
  );
};

export default MovieCard;
