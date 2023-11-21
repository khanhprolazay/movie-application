import { Movie, DetailMovie, Actor } from "@/type";

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

const getActorImage = (actor: Actor) => {
  const { imageUrl } = actor;

  if (!imageUrl) {
    return "https://media.istockphoto.com/id/1300845620/vi/vec-to/bi%E1%BB%83u-t%C6%B0%E1%BB%A3ng-ng%C6%B0%E1%BB%9Di-d%C3%B9ng-ph%E1%BA%B3ng-b%E1%BB%8B-c%C3%B4-l%E1%BA%ADp-tr%C3%AAn-n%E1%BB%81n-tr%E1%BA%AFng-bi%E1%BB%83u-t%C6%B0%E1%BB%A3ng-ng%C6%B0%E1%BB%9Di-d%C3%B9ng-minh-h%E1%BB%8Da-vector.jpg?s=612x612&w=0&k=20&c=MyAgwZm-Ct_rQpQGYh0Wb0N7KeAaFsY_WrZJ89EAiIw=";
  }

  if (imageUrl[0] === "/") {
    return `https://image.tmdb.org/t/p/w500${imageUrl}`;
  }

  return imageUrl;
}

const getDetailUrl = (id: number) => `/detail/${id}`;
const getWatchUrl = (id: number) => `/watch/${id}`;

const urlUtils = { getImageUrl, getDetailUrl, getWatchUrl, getActorImage };
export default urlUtils;