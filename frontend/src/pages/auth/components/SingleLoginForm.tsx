import {
  Avatar,
  Button,
  Input,
  Radio,
  Spinner,
  Typography,
} from "@material-tailwind/react";
import "./animation.css";
import { FC } from "react";
import { LoginDTO } from "@/type";
import google from "../../../assets/images/google.svg";
import { Link, useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import authenticationActions from "@/actions/authentication.action";
import { useGoogleLogin } from "@react-oauth/google";
import AppLogo from "@/components/AppLogo";

const SingleLoginForm: FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.authentication);

  const { register, handleSubmit } = useForm<LoginDTO>();
  const onSubmit: SubmitHandler<LoginDTO> = (values) =>
    dispatch(authenticationActions.login(values, navigate));

  const googleLogin = useGoogleLogin({
    onSuccess: (response) =>
      dispatch(
        authenticationActions.googleLogin({
          accessToken: response.access_token,
          navigate,
        }),
      ),
    onError: (error) => console.log(error),
  });

  return (
    <form
      autoComplete="off"
      onSubmit={handleSubmit(onSubmit)}
      className=" login-animation relative left-0 top-0 flex h-full items-center justify-around backdrop-blur-xl lg:absolute"
    >
      <div className="max-w-96 relative mx-8 flex w-full flex-col sm:mx-16 md:mx-36 lg:mx-40">
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
          Login
        </Typography>
        <Typography
          variant="paragraph"
          className="font-base mb-8 font-manrope text-base text-slate-300"
        >
          Stay with login and enjoy our Products. We appreciate your
          subcription.
        </Typography>

        <div className={`${loading && "opacity-70"}`}>
          <div className="mb-4 flex flex-col gap-y-3">
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

            <Input containerProps={{ className: "!h-0 hidden" }} />
          </div>

          <div className="flex items-center justify-between">
            <Radio
              color="yellow"
              className="h-5 w-5"
              label={
                <Typography
                  variant="paragraph"
                  className="font-manrope text-xs font-medium text-slate-300"
                >
                  Save login
                </Typography>
              }
            />

            <Typography
              variant="paragraph"
              className="cursor-pointer font-manrope text-xs font-medium text-cyan-400"
            >
              Forgot Password
            </Typography>
          </div>

          <Button
            type="submit"
            className="mb-6 mt-4 w-full bg-amber-300 font-manrope text-sm font-semibold text-gray-950"
          >
            Login
          </Button>

          {loading && (
            <Spinner className="absolute bottom-0 left-0 right-0 top-0 m-auto h-7 w-7" />
          )}
        </div>

        <Typography className="inline cursor-pointer text-center font-manrope text-xs font-medium text-slate-300">
          Does not have an account?
          <Link
            to="/auth/register"
            className="inline font-manrope text-xs font-medium text-cyan-400"
          >
            &nbsp;&nbsp;Register
          </Link>
        </Typography>

        <div className="mb-6 mt-8 flex w-full items-center justify-between gap-8">
          <div className="w-full border-b border-slate-400"></div>
          <Typography className=" w-auto font-manrope text-sm font-semibold text-slate-200">
            OR
          </Typography>
          <div className="w-full border-b border-slate-400"></div>
        </div>

        <div className="flex w-full items-center justify-evenly gap-8">
          <div
            onClick={() => googleLogin()}
            className="flex cursor-pointer flex-col items-center transition-all duration-300 ease-in-out hover:-translate-y-1"
          >
            <Avatar src={google} className="mb-1 h-8 w-8 bg-stone-100 p-1" />
            <Typography className="font-manrope text-sm text-slate-200">
              Google
            </Typography>
          </div>
        </div>
      </div>
    </form>
  );
};

export default SingleLoginForm;
