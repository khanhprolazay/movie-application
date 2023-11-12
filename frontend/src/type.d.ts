import { ConnectedProps, InferableComponentEnhancerWithProps } from "react-redux";
import { RouterPropsType } from "./utils/withRouter";

export interface ReduxAction {
  type: string,
  payload?: Record<string, any>,
}

export type ErrorResponseType = {
  message?: string,
  error?: string,
  statusCode?: number,
}

// Auth DTO
export type RegisterDTO = {
  email: string,
  password: string,
  rePassword: string
}

export type LoginDTO = {
  email: string,
  password: string,
}

export type LoginResponseDto = {
  accessToken: string,
  refreshToken: string,
}


// Entity
export type Sex = "MALE" | "FEMALE";
export interface User {
  id: number,
  firstName?: string,
  lastName?: string,
  email: string,
  sex: Sex,
  phone?: string,
  avatar: string,
}

export interface Genre {
  id: number,
  name: string,
}


export interface Movie {
  id: number,
  title: string,
  rating: number,
  imageUrl: string,
  release?: string,
  posterPath?: string,
  movieLength?: number,
  backdropPath?: string,
  genres?: Genre[],
}

export interface Trailer {
  type: string;
  imdbId: string;
}

export interface Actor {
  id: number;
  name: string;
  imageUrl: string;
}

export interface Cast {
  role: string;
  actor: Actor;
}

export interface DetailMovie {
  id: number,
  imdbId: string,
  title: string,
  rating: number,
  description?: string,
  movieLength?: number,
  trailers: Trailer[],
  imageUrl: string,
  release?: string,
  plot?: string,
  banner: string,
  posterPath?: string,
  backdropPath?: string,
  genres: { genre: Genre }[], 
  casts: Cast[],
}

// Other
export type AlertType = "success" | "warning" | "error";
export interface Alert {
  id: string,
  type: AlertType,
  message: string
}