import moviesActions from "@/actions/movie.action";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import stringUtils from "@/utils/string.util";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useScrollToTop } from "./use-scroll-to-top.hook";

export const useMovie = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const { loading, relatedLoading, data, related } = useAppSelector(
    (state) => state.movie.current,
  );

  useScrollToTop([id]);

  useEffect(() => {
    const idInt = stringUtils.cParseInt(id, 10);
    if (idInt) dispatch(moviesActions.getMovieDetail(idInt));
  }, [id]);

  return { loading, relatedLoading, data, related };
};
