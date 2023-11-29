import {
  Avatar,
  Button,
  Input,
  Radio,
  Typography,
} from "@material-tailwind/react";
import { FC } from "react";
import { useAppSelector } from "@/redux/hooks";
import {
  FormContainer,
  grid,
  inputDisable,
  inputEnable,
  inputHeader,
  span,
} from "./base";
import AppContainer from "@/components/AppContainer";

const ProfileForm: FC = () => {
  const user = useAppSelector((state) => state.user.data);

  return (
    <AppContainer className="pt-8">
      <FormContainer header="My Profile" content="Manage your information">
        <div className="flex flex-col-reverse items-center justify-around md:flex-row md:items-stretch md:justify-between">
          <form className="w-full md:w-2/3">
            <div className={`${grid} items-baseline  gap-y-4`}>
              <Typography variant="h6" className={`${span} ${inputHeader}`}>
                First name
              </Typography>
              <Input
                className={inputEnable}
                placeholder="Ex: Le Dang"
                variant="standard"
                color="white"
                value={user ? user.firstName : ""}
                containerProps={{ className: span }}
                labelProps={{ className: "hidden" }}
              />

              <Typography variant="h6" className={`${span} ${inputHeader}`}>
                Last name
              </Typography>
              <Input
                className={inputEnable}
                placeholder="Ex: Minh"
                variant="standard"
                color="white"
                value={user ? user.lastName : ""}
                containerProps={{ className: span }}
                labelProps={{ className: "hidden" }}
              />

              <Typography variant="h6" className={`${span} ${inputHeader}`}>
                Phone
              </Typography>
              <Input
                className={inputDisable}
                variant="standard"
                placeholder="Mobile Number"
                value={user ? user?.phone : ""}
                style={{ fontStyle: "300" }}
                color="white"
                containerProps={{ className: span }}
                labelProps={{ className: "!text-slate-300" }}
              />

              <Typography variant="h6" className={`${span} ${inputHeader}`}>
                Email
              </Typography>
              <Input
                className={inputDisable}
                placeholder="Email Address"
                variant="standard"
                disabled
                color="white"
                value={user ? user?.email : ""}
                containerProps={{ className: span }}
                style={{ fontStyle: "300" }}
              />

              <div className={`${grid} col-span-full items-center`}>
                <Typography variant="h6" className={`${span} ${inputHeader}`}>
                  Sex
                </Typography>
                <div className={`-ml-3 flex w-full gap-x-4`}>
                  <Radio
                    name="sex"
                    color="red"
                    className="active:!bg-red h-4 w-4"
                    defaultChecked={user?.sex === "MALE"}
                    label={
                      <Typography className="font-manrope text-sm font-normal text-slate-200">
                        Male
                      </Typography>
                    }
                  />
                  <Radio
                    name="sex"
                    color="red"
                    className="h-4 w-4"
                    defaultChecked={user?.sex === "FEMALE"}
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
                  color="red"
                  size="sm"
                  className="rounded-sm font-manrope text-sm font-medium normal-case"
                >
                  Save
                </Button>
              </div>
            </div>
          </form>

          <div className="my-3 ml-8 border-r border-r-slate-50/[0.06] md:my-0 md:block" />

          <div className="flex w-full flex-col items-center gap-y-4 md:w-1/3">
            <Avatar src={user?.avatar} className="h-24 w-24" alt="avatar" />
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