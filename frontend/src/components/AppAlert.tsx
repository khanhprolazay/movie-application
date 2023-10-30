import alertActions from "@/actions/alert.action";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { Alert, AlertType } from "@/type";
import {
  CheckCircleIcon,
  ExclamationCircleIcon,
  XCircleIcon,
} from "@heroicons/react/20/solid";
import { Alert as MAlert } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import { FC } from "react";

const alertTheme = {
  warning: {
    borderColor: "border-[#faad14]",
    textColor: "text-[#faad14]",
    backgroundColor: "bg-[#fffbe6]",
  },
  error: {
    borderColor: "border-[#ff4d4f]",
    textColor: "text-[#ff4d4f]",
    backgroundColor: "bg-[#fff2f0]",
  },
  success: {
    borderColor: "border-[#2ec946]",
    textColor: "text-[#2ec946]",
    backgroundColor: "bg-[#f6ffed]",
  },
};

const getIcon = (type: AlertType) => {
  switch (type) {
    case "warning":
      return (
        <ExclamationCircleIcon
          className={`h-6 w-6 ${alertTheme.warning.textColor}`}
        />
      );

    case "error":
      return (
        <XCircleIcon className={`h-6 w-6 ${alertTheme.error.textColor}`} />
      );

    default:
      return (
        <CheckCircleIcon
          color="#2ec946"
          className={`h-6 w-6 ${alertTheme.success.textColor}`}
        />
      );
  }
};

const getColor = (type: AlertType) => {
  switch (type) {
    case "warning":
      return `${alertTheme.warning.borderColor} ${alertTheme.warning.backgroundColor}`;

    case "success":
      return `${alertTheme.success.borderColor} ${alertTheme.success.backgroundColor}`;

    default:
      return `${alertTheme.error.borderColor} ${alertTheme.error.backgroundColor}`;
  }
};

interface AlertItemProps {
  index: number;
  alert: Alert;
}
const AlertItem: FC<AlertItemProps> = (props) => {
  const { index, alert } = props;
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => setOpen(false), 4000);
    setTimeout(() => dispatch(alertActions.remove()), 4300);
  }, []);

  // 88: default and max height of alert
  // 16: space between alerts
  // index = 0 => y = 0
  // index = 1 => y = 1 * 88 + 1 * 16
  // index = 2 => y = 2 * 88 + 2 * 16
  const y = index * (88 + 16);

  return (
    <MAlert
      open={open}
      icon={getIcon(alert.type)}
      animate={{
        mount: { x: 0, y },
        unmount: { x: 200, y },
      }}
      className={`absolute right-0 top-0 z-50 h-auto w-fit min-w-[360px] rounded-none border-l-4 px-6 py-5 text-slate-900 sm:min-w-[428px] ${getColor(
        alert.type,
      )}`}
    >
      <span className="capitalize">{alert.type}</span>
      <span className="mt-1 block text-sm">{typeof alert.message === "object" ? JSON.stringify(alert.message) : alert.message}</span>
    </MAlert>
  );
};

const AppAlert: FC = () => {
  const alerts = useAppSelector((state) => state.alert.data);
  return (
    <div>
      {alerts.map((alert, index) => (
        <AlertItem key={`alert-${alert.id}`} index={index} alert={alert} />
      ))}
    </div>
  );
};

export default React.memo(AppAlert, () => true);
