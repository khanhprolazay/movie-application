import { Movie, DetailMovie } from "@/type";

const getImageUrl = (movie: Movie | DetailMovie, order: "ASC" | "DESC" = "ASC") => {
  const { imageUrl, posterPath, title } = movie;

  const lowResImageUrl = posterPath ? `https://image.tmdb.org/t/p/w500${posterPath}` : null;
  const highResImageUrl = imageUrl || null;

  if (order === "ASC") {
    return lowResImageUrl || highResImageUrl || `https://via.placeholder.com/500x750?text=${title}&bg=000000`;
  } else {
    return highResImageUrl || lowResImageUrl || `https://via.placeholder.com/500x750?text=${title}&bg=000000`;
  }
}

const getDetailUrl = (id: number) => `/detail/${id}`;
const getWatchUrl = (id: number) => `/watch/${id}`;

const urlUtils = { getImageUrl, getDetailUrl, getWatchUrl };
export default urlUtils;