import {
  Avatar,
  Button,
  Input,
  Radio,
  Typography,
} from "@material-tailwind/react";
import { FC } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  FormContainer,
  grid,
  inputDisable,
  inputEnable,
  inputLabel,
  span,
} from "./base";
import AppContainer from "@/components/AppContainer";
import { useForm } from "react-hook-form";
import { User } from "@/type";
import userActions from "@/actions/user.action";
import alertActions from "@/actions/alert.action";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const ProfileForm: FC = () => {
  const dispatch = useAppDispatch();
  const { data, loading } = useAppSelector((state) => state.user);

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("First name is required"),
    lastName: Yup.string().required("Last name is required"),
    phone: Yup.string().required("Phone is required"),
    email: Yup.string().required("Email is required"),
    sex: Yup.string().oneOf(["MALE", "FEMALE"])
  });

  const { register, handleSubmit } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onError = (errors: any) => {
    const firstErrorKey = Object.keys(errors)[0];
    const firstErrorMessage = errors[firstErrorKey]?.message;
    dispatch(alertActions.add("error", firstErrorMessage));
  };
  const onSubmit = (data: Partial<User>) =>
    dispatch(userActions.updateUser(data));

  return (
    <AppContainer className="pt-8">
      <FormContainer header="My Profile" content="Manage your information">
        <div className="flex flex-col-reverse items-center justify-around md:flex-row md:items-stretch md:justify-between">
          <form
            className="w-full md:w-2/3"
            onSubmit={handleSubmit(onSubmit as any, onError)}
          >
            <div className={`${grid} items-baseline  gap-y-4`}>
              <label
                htmlFor="firstName"
                className={`${span.label} ${inputLabel}`}
              >
                First name
              </label>
              <Input
                id="firstName"
                className={inputEnable}
                placeholder="Ex: Le Dang"
                color="white"
                variant="standard"
                {...register("firstName")}
                containerProps={{ className: span.input }}
                labelProps={{ className: "hidden" }}
                defaultValue={data?.firstName}
              />

              <label
                htmlFor="lastName"
                className={`${span.label} ${inputLabel}`}
              >
                Last name
              </label>
              <Input
                id="lastName"
                className={inputEnable}
                placeholder="Ex: Minh"
                variant="standard"
                color="white"
                defaultValue={data?.lastName}
                {...register("lastName")}
                containerProps={{ className: span.input }}
                labelProps={{ className: "hidden" }}
              />

              <label htmlFor="phone" className={`${span.label} ${inputLabel}`}>
                Phone
              </label>
              <Input
                id="phone"
                className={inputDisable}
                variant="standard"
                placeholder="Mobile Number"
                defaultValue={data?.phone}
                {...register("phone")}
                style={{ fontStyle: "300" }}
                color="white"
                containerProps={{ className: span.input }}
                labelProps={{ className: "!text-slate-300" }}
              />

              <label htmlFor="email" className={`${span.label} ${inputLabel}`}>
                Email
              </label>
              <Input
                readOnly
                id="email"
                color="white"
                variant="standard"
                {...register("email")}
                className={inputDisable}
                placeholder="Email Address"
                defaultValue={data?.email}
                style={{ fontStyle: "300" }}
                containerProps={{ className: span.input }}
              />

              <div className={`${grid} col-span-full items-center`}>
                <Typography
                  variant="h6"
                  className={`${span.label} ${inputLabel}`}
                >
                  Sex
                </Typography>
                <div className={`-ml-3 flex w-full gap-x-4`}>
                  <Radio
                    color="red"
                    value="MALE"
                    {...register("sex")}
                    className="active:!bg-red h-4 w-4"
                    defaultChecked={data?.sex === "MALE"}
                    label={
                      <Typography className="font-manrope text-sm font-normal text-slate-200">
                        Male
                      </Typography>
                    }
                  />
                  <Radio
                    color="red"
                    value="FEMALE"
                    {...register("sex")}
                    className="h-4 w-4"
                    defaultChecked={data?.sex === "FEMALE"}
                    label={
                      <Typography className="font-manrope text-sm font-normal text-slate-200">
                        Female
                      </Typography>
                    }
                  />
                </div>
              </div>

              <div className="col-span-full mt-6 xs:col-span-9 xs:col-start-4 xs:mt-0">
                <Button
                  loading={loading}
                  color="red"
                  size="sm"
                  type="submit"
                  className="flex gap-2 rounded-sm font-manrope text-sm font-medium normal-case"
                >
                  Save
                </Button>
              </div>
            </div>
          </form>

          <div className="my-3 ml-8 border-r border-divider md:my-0 md:block" />

          <div className="flex w-full flex-col items-center gap-y-4 md:w-1/3">
            <Avatar src={data?.avatar} className="h-24 w-24" alt="avatar" />
            <Button
              color="red"
              variant="outlined"
              className="rounded-sm text-xs font-medium normal-case !italic text-slate-200"
            >
              Select Image
            </Button>
          </div>
        </div>
      </FormContainer>
    </AppContainer>
  );
};

export default ProfileForm;