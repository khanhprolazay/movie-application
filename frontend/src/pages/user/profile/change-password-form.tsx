import { FC } from "react";
import { FormContainer, grid, inputEnable, inputHeader, span } from "./base";
import { Button, Input, Typography } from "@material-tailwind/react";
import AppContainer from "@/components/AppContainer";

const ChangePasswordForm: FC = () => {
  return (
    <AppContainer className="pt-8">
      <FormContainer
        header="Change Password"
        content="For security, please do not share password to other people"
      >
        <form className="h-full w-full">
          <div className={`${grid} items-baseline gap-y-4`}>
            <Typography variant="h6" className={`${span} ${inputHeader}`}>
              Old password
            </Typography>
            <Input
              className={inputEnable}
              placeholder="Enter your current password"
              variant="standard"
              autoComplete="off"
              aria-autocomplete="none"
              color="white"
              type="password"
              containerProps={{ className: span }}
              labelProps={{ className: "hidden" }}
            />

            <Typography variant="h6" className={`${span} ${inputHeader}`}>
              New password
            </Typography>
            <Input
              className={inputEnable}
              placeholder="Enter your new password"
              variant="standard"
              autoComplete="off"
              aria-autocomplete="none"
              color="white"
              type="password"
              containerProps={{ className: span }}
              labelProps={{ className: "hidden" }}
            />

            <Typography variant="h6" className={`${span} ${inputHeader}`}>
              Re-new password
            </Typography>
            <Input
              className={inputEnable}
              placeholder="Enter again your new password"
              variant="standard"
              autoComplete="off"
              aria-autocomplete="none"
              color="white"
              type="password"
              containerProps={{ className: span }}
              labelProps={{ className: "hidden" }}
            />

            <div className="col-span-full mt-4 xs:col-span-9 xs:col-start-4 xs:mt-4">
              <Button
                color="red"
                size="sm"
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
