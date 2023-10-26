export enum BaseAction {
  CREATE="CREATE",
  UPDATE="UPDATE",
  DELETE="DELETE",
  GET_BY_ID="GET_BY_ID",
}
export type BaseActionUnion = keyof typeof BaseAction

export enum EntityKey { 
  USER="USER", 
  MOVIE="MOVIE", 
  GENRE="GENRE",
}
export type EntityKeyUnion = keyof typeof EntityKey

export type BasePattern<key extends EntityKeyUnion> = {
  [action in BaseActionUnion]: `${key}.${action}` 
}[BaseAction]

export type GenrePattern = BasePattern<"GENRE"> | "GENRE.GET_ALL"
export type MoviePattern = BasePattern<"MOVIE"> | "MOVIE.GET_BY_YEAR" | "MOVIE.GET_BY_RATING" | "MOVIE.GET_BY_GENRES";
export type AuthPattern = "AUTH.LOGIN" | "AUTH.REGISTER" | "AUTH.VALIDATE" | "AUTH.GOOGLE_LOGIN" | "AUTH.REFRESH_TOKEN"
export type UserPattern = BasePattern<"USER"> | "USER.GET_BY_EMAIL" | "USER.CREATE_GOOGLE" | "USER.CHECK_BY_EMAIL" | "USER.GET_BY_EMAIL_AND_PASSWORD"

export type Pattern = UserPattern | MoviePattern  | AuthPattern | GenrePattern

export type PatternOptionType = {
  [T in Pattern]: `${T}`
}

export const PatternOption: PatternOptionType = {
  // USER
  "USER.CREATE": "USER.CREATE",
  "USER.UPDATE": "USER.UPDATE",
  "USER.DELETE": "USER.DELETE",
  "USER.GET_BY_ID": "USER.GET_BY_ID",
  "USER.CREATE_GOOGLE": "USER.CREATE_GOOGLE",
  "USER.GET_BY_EMAIL": "USER.GET_BY_EMAIL",
  "USER.CHECK_BY_EMAIL": "USER.CHECK_BY_EMAIL",
  "USER.GET_BY_EMAIL_AND_PASSWORD": "USER.GET_BY_EMAIL_AND_PASSWORD",

  // MOVIE
  "MOVIE.CREATE": "MOVIE.CREATE",
  "MOVIE.UPDATE": "MOVIE.UPDATE",
  "MOVIE.DELETE": "MOVIE.DELETE",
  "MOVIE.GET_BY_ID": "MOVIE.GET_BY_ID",
  "MOVIE.GET_BY_YEAR": "MOVIE.GET_BY_YEAR",
  "MOVIE.GET_BY_GENRES": "MOVIE.GET_BY_GENRES",
  "MOVIE.GET_BY_RATING": "MOVIE.GET_BY_RATING",

  // AUTH
  "AUTH.LOGIN": "AUTH.LOGIN",
  "AUTH.REGISTER": "AUTH.REGISTER",
  "AUTH.VALIDATE": "AUTH.VALIDATE",
  "AUTH.GOOGLE_LOGIN": "AUTH.GOOGLE_LOGIN",
  "AUTH.REFRESH_TOKEN": "AUTH.REFRESH_TOKEN",

  // GENRE
  "GENRE.CREATE": "GENRE.CREATE",
  "GENRE.UPDATE": "GENRE.UPDATE",
  "GENRE.DELETE": "GENRE.DELETE",
  "GENRE.GET_ALL": "GENRE.GET_ALL",
  "GENRE.GET_BY_ID": "GENRE.GET_BY_ID",
}
