import moviesActions from "@/actions/movie.action";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import stringUtils from "@/utils/string.util";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

export const useMovie = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const { loading, relatedLoading, data, related } = useAppSelector(
    (state) => state.movie.current,
  );

  useEffect(() => {
    const idInt = stringUtils.cParseInt(id, 10);
    if (idInt) dispatch(moviesActions.getMovieDetail(idInt));
  }, [id]);

  return { loading, relatedLoading, data, related };
};
