import { Button, Input, Spinner, Typography } from "@material-tailwind/react";
import { SubmitHandler, useForm } from "react-hook-form";
import "./animation.css";
import { FC } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeftIcon } from "@heroicons/react/20/solid";
import { RegisterDTO } from "@/type";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import authenticationActions from "@/actions/authentication.action";
import AppLogo from "@/components/AppLogo";

const SingleRegisterForm: FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.authentication);

  const { register, handleSubmit } = useForm<RegisterDTO>();
  const onSubmit: SubmitHandler<RegisterDTO> = (values) =>
    dispatch(authenticationActions.register(values, navigate));

  return (
    <form
      autoComplete="off"
      onSubmit={handleSubmit(onSubmit)}
      className="register-animation static right-0 top-0 flex h-full items-center justify-around backdrop-blur-xl lg:absolute"
    >
      <div className="max-w-96 relative mx-8 flex w-full flex-col transition-all sm:mx-16 md:mx-36 lg:mx-40">
        <Link to="/home">
          <AppLogo
            variant="h3"
            imageProps={{ className: "!w-10 !h-10" }}
            textProps={{ className: "left-[48px] top-[6px]" }}
            containerProps={{ className: "mx-auto left-0 -top-16 absolute" }}
          />
        </Link>
        <Typography
          variant="h1"
          className="mb-4 font-manrope text-xl font-bold text-slate-200"
        >
          SIGN UP
        </Typography>
        <Typography
          variant="paragraph"
          className="font-base mb-8 font-manrope text-base text-slate-300"
        >
          Stay with login and enjoy our Products. We appreciate your
          subcription.
        </Typography>

        <div
          className={`${
            loading && "opacity-70"
          } relative my-2 flex flex-col gap-y-3`}
        >
          <Input
            required
            size="lg"
            type="email"
            color="white"
            label="Email"
            autoComplete="off"
            variant="standard"
            className="px-2 py-5"
            {...register("email")}
          />
          <Input
            required
            size="lg"
            color="white"
            type="password"
            label="Password"
            variant="standard"
            className="px-2 py-5"
            autoComplete="off"
            {...register("password")}
          />
          <Input
            required
            size="lg"
            color="white"
            type="password"
            className="px-2 py-5"
            variant="standard"
            label="Re-password"
            autoComplete="new-password"
            {...register("rePassword")}
          />

          <Button
            type="submit"
            className="mb-6 mt-5 flex items-center justify-center bg-amber-300 font-manrope text-sm font-semibold text-gray-950"
          >
            REGISTER
          </Button>

          {loading && (
            <Spinner className="absolute bottom-0 left-0 right-0 top-0 m-auto h-7 w-7" />
          )}
        </div>

        <Link
          to="/auth/login"
          className="inline cursor-pointer font-manrope text-xs font-medium text-cyan-400"
        >
          <ArrowLeftIcon className="mr-2 inline h-4 w-4" />
          Back to login
        </Link>
      </div>
    </form>
  );
};

export default SingleRegisterForm;
