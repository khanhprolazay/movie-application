import { FC } from "react";
import { FormContainer, grid, inputEnable, inputLabel, span } from "./base";
import { Button, Input } from "@material-tailwind/react";
import AppContainer from "@/components/AppContainer";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useForm } from "react-hook-form";
import alertActions from "@/actions/alert.action";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import userActions from "@/actions/user.action";
import { UpdatePasswordDto } from "@/models";

const ChangePasswordForm: FC = () => {
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.user);

  const validationSchema = Yup.object().shape({
    oldPassword: Yup.string().required("Old password is required"),
    newPassword: Yup.string()
      .required("New password is required")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
        "Password must contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character",
      ),
    confirmPassword: Yup.string()
      .required("Confirm password is required")
      .oneOf(
        [Yup.ref("newPassword")],
        "Confirm password must match with new password",
      ),
  });

  const { register, handleSubmit } = useForm<UpdatePasswordDto>({
    resolver: yupResolver(validationSchema),
  });

  const onError = (errors: any) => {
    const firstErrorKey = Object.keys(errors)[0];
    const firstErrorMessage = errors[firstErrorKey]?.message;
    dispatch(alertActions.add("error", firstErrorMessage));
  };
  const onSubmit = (data: UpdatePasswordDto) => dispatch(userActions.updatePassword(data));

  return (
    <AppContainer className="pt-8">
      <FormContainer
        header="Change Password"
        content="For security, please do not share password to other people"
      >
        <form
          className="h-full w-full"
          onSubmit={handleSubmit(onSubmit, onError)}
        >
          <div className={`${grid} items-baseline gap-y-4`}>
            <label
              htmlFor="oldPassword"
              className={`${span.label} ${inputLabel}`}
            >
              Old password
            </label>
            <Input
              id="oldPassword"
              className={inputEnable}
              placeholder="Enter your current password"
              variant="standard"
              autoComplete="off"
              aria-autocomplete="none"
              color="white"
              type="password"
              containerProps={{ className: span.input }}
              labelProps={{ className: "hidden" }}
              {...register("oldPassword")}
            />

            <label
              htmlFor="newPassword"
              className={`${span.label} ${inputLabel}`}
            >
              New password
            </label>
            <Input
              id="newPassword"
              className={inputEnable}
              placeholder="Enter your new password"
              variant="standard"
              autoComplete="off"
              aria-autocomplete="none"
              color="white"
              type="password"
              containerProps={{ className: span.input }}
              labelProps={{ className: "hidden" }}
              {...register("newPassword")}
            />

            <label
              htmlFor="confirmPassword"
              className={`${span.label} ${inputLabel}`}
            >
              Confirm password
            </label>
            <Input
              id="confirmPassword"
              className={inputEnable}
              placeholder="Enter again your new password"
              variant="standard"
              autoComplete="off"
              aria-autocomplete="none"
              color="white"
              type="password"
              containerProps={{ className: span.input }}
              labelProps={{ className: "hidden" }}
              {...register("confirmPassword")}
            />

            <div className="col-span-full mt-4 xs:col-span-9 xs:col-start-4 xs:mt-4">
              <Button
                loading={loading}
                color="red"
                size="sm"
                type="submit"
                className="rounded-sm font-manrope text-sm font-medium normal-case"
              >
                Change
              </Button>
            </div>
          </div>
        </form>
      </FormContainer>
    </AppContainer>
  );
};

export default ChangePasswordForm;
