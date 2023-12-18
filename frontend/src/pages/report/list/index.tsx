import AppContainer from "@/components/AppContainer";
import { useAppSelector } from "@/redux/hooks";
import { EyeIcon, PencilIcon } from "@heroicons/react/20/solid";
import {
  Card,
  CardBody,
  Chip,
  IconButton,
  Tooltip,
  Typography,
} from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";

const TABLE_HEAD = ["Id", "Title", "Owner", "Created at", "Updated at", "Start date", "Expired date", "Status", ""];

const ListReportPage = () => {
  const navigate = useNavigate();
  const { reports } = useAppSelector((state) => state.report);

  return (
    <AppContainer containerProps={{
      className: "my-10"
    }}>
      <Card className=" rounded-xl bg-[#151921]">
        <CardBody className="px-0 pt-0 rounded-xl !text-[#dcdcfea6]">
          <table className="w-full min-w-max table-auto text-left">
            <thead className="bg-[#dcdcf214]">
              <tr>
                {TABLE_HEAD.map((head) => (
                  <th
                    key={head}
                    className="border-y p-4"
                  >
                    <Typography
                      className="leading-none font-bold text-sm"
                    >
                      {head}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="text-sm">
              {reports.map(
                (
                  { id, title, userName, createdAt, updatedAt, startedDate, expiredDate },
                  index,
                ) => {
                  const isLast = index === reports.length - 1;
                  const active = new Date() < new Date(expiredDate);
                  const classes = isLast
                    ? "p-4"
                    : "p-4 border-b border-blue-gray-50";

                  return (
                    <tr key={id}>
                      <td className={classes}>
                        <div className="flex items-center gap-3">
                          <Typography
                            variant="small"
                            className="font-bold"
                          >
                            {id}
                          </Typography>
                        </div>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          className="font-normal"
                        >
                          {title}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          className="font-normal"
                        >
                          {userName}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          className="font-normal"
                        >
                          {new Date(createdAt).toLocaleDateString()}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          className="font-normal"
                        >
                          {new Date(updatedAt).toLocaleDateString()}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          className="font-normal"
                        >
                          {new Date(startedDate).toLocaleDateString()}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          className="font-normal"
                        >
                          {new Date(expiredDate).toLocaleDateString()}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <div className="w-max">
                          <Chip
                            size="sm"
                            variant="outlined"
                            value={active ? "Active" : "Expired"}
                            color={active ? "green" : "red"}
                          />
                        </div>
                      </td>
                      <td className={classes}>
                        <Tooltip content="Edit User">
                          <IconButton variant="text" onClick={() => navigate(`/reports/${id}`)}>
                            <EyeIcon className="h-4 w-4 text-teal-400"/>
                          </IconButton>
                        </Tooltip>
                      </td>
                    </tr>
                  );
                },
              )}
            </tbody>
          </table>
        </CardBody>
      </Card>
    </AppContainer>
  );
};

export default ListReportPage;
