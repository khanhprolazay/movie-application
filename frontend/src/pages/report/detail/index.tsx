import reportActions from "@/actions/report.action";
import AppContainer from "@/components/AppContainer";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

const ReportDetailPage = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const { current } = useAppSelector((state) => state.report);

  useEffect(() => {
    if (id) dispatch(reportActions.getReport(parseInt(id)));
  }, [id]);

  return (
    <AppContainer containerProps={{ className: "my-10" }}>
      {current ? <embed src={current?.embedUrl} className="w-full h-[700px]" /> : <></>};
    </AppContainer>
  );
};

export default ReportDetailPage;
