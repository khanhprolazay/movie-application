import { Container } from "@/components/container";
import { Header } from "@/components/Header";
import PosterFilm from "@/components/PosterFilm";
import { FC } from "react";

import imageFilmDetail from "@/assets/imageMovie/oppenheimer_ver3.jpg";
import imageFilm1 from "@/assets/imageMovie/meg_two_the_trench_ver3.jpg";

import actor1 from "@/assets/imageActor/DetailFilm/1.jpg";
import actor2 from "@/assets/imageActor/DetailFilm/2.jpg";
import actor3 from "@/assets/imageActor/DetailFilm/3.jpg";
import actor4 from "@/assets/imageActor/DetailFilm/4.jpg";


interface DetailsFilmProps {
  name: string;
  discription: string;
  imageCast: string[];
  rating: number;
  duration: number;
  releaseDate: string;
  genres: string
}

// export const DetailPage = (props: DetailsFilmProps) => {
export const DetailPage = () => {


  return (
    <main className="relative flex flex-col bg-black">
      <Header />
      <div className="z-10">
        <Container>
          <div className="mb-10 flex gap-10">
            <div className="mt-8 ml-5 flex-1 flex-col items-center justify-center">
              <h1 className="my-5 text-center text-lg font-semibold text-white sm:text-xl md:text-2xl lg:text-3xl xl:text-5xl">
                Oppenheimer
                {/* {props.name} */}
              </h1>
              <h2 className="text-xs font-light text-white sm:text-sm md:text-lg lg:text-xl xl:text-2xl ">
                Delivering a thrilling dramatic experience as a mysterious man
                must risk destroying the world just to save itself. The story is
                about American scientist J. Robert Oppenheimer and his role in
                developing the atomic bomb
                {/* {props.discription} */}
              </h2>
              <h2 className="mb-2 mt-3 text-xs font-normal text-white sm:text-sm md:text-lg lg:text-xl xl:text-2xl">
                Cast:
              </h2>
              <div className="flex gap-2">
                {/* <img className="h-28 border-2 border-white " src={props.imageCast[0]} /> */}
                <img className="h-16 sm:h-28 border-2 border-white " src={actor1} />
                <img className="h-16 sm:h-28 border-2 border-white " src={actor2} />
                <img className="h-16 sm:h-28 border-2 border-white " src={actor3} />
                <img className="h-16 sm:h-28 border-2 border-white " src={actor4} />
              </div>
              <h2 className="mt-3 flex items-center text-xs font-normal text-white sm:text-sm md:text-lg lg:text-xl xl:text-2xl">
                Rating: 8.5/10
                {/* Rating: {props.rating} */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="ml-1 h-7 w-7 text-yellow-500"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                    clipRule="evenodd"
                  />
                </svg>
              </h2>
              <h2 className="mt-3 text-xs font-normal text-white sm:text-sm md:text-lg lg:text-xl xl:text-2xl">
                Duration: 105 minutes
                {/* Duration: {props.duration} */}
              </h2>
              <h2 className="mt-3 text-xs font-normal text-white sm:text-sm md:text-lg lg:text-xl xl:text-2xl">
                Release Date: 2023-08-11
                {/* Release Date: {props.releaseDate} */}
              </h2>
              <h2 className="mt-3 text-xs font-normal text-white sm:text-sm md:text-lg lg:text-xl xl:text-2xl">
                Genres: Biography, Psychology, Drama
                {/* Genres: {props.genres} */}
              </h2>
              <div className="mt-5 flex gap-5">
                <button className="flex items-center gap-2 bg-green-600 text-sm font-bold hover:bg-red-600 sm:text-sm lg:text-lg xl:text-xl">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="h-6 w-6"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Watch Trailer
                </button>
                {/* <button className="flex items-center gap-2 bg-green-600 text-sm font-bold hover:bg-red-600 sm:text-sm lg:text-lg xl:text-xl">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="h-6 w-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 01-1.125-1.125M3.375 19.5h1.5C5.496 19.5 6 18.996 6 18.375m-3.75 0V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125m0 3.75h-1.5A1.125 1.125 0 0118 18.375M20.625 4.5H3.375m17.25 0c.621 0 1.125.504 1.125 1.125M20.625 4.5h-1.5C18.504 4.5 18 5.004 18 5.625m3.75 0v1.5c0 .621-.504 1.125-1.125 1.125M3.375 4.5c-.621 0-1.125.504-1.125 1.125M3.375 4.5h1.5C5.496 4.5 6 5.004 6 5.625m-3.75 0v1.5c0 .621.504 1.125 1.125 1.125m0 0h1.5m-1.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125m1.5-3.75C5.496 8.25 6 7.746 6 7.125v-1.5M4.875 8.25C5.496 8.25 6 8.754 6 9.375v1.5m0-5.25v5.25m0-5.25C6 5.004 6.504 4.5 7.125 4.5h9.75c.621 0 1.125.504 1.125 1.125m1.125 2.625h1.5m-1.5 0A1.125 1.125 0 0118 7.125v-1.5m1.125 2.625c-.621 0-1.125.504-1.125 1.125v1.5m2.625-2.625c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125M18 5.625v5.25M7.125 12h9.75m-9.75 0A1.125 1.125 0 016 10.875M7.125 12C6.504 12 6 12.504 6 13.125m0-2.25C6 11.496 5.496 12 4.875 12M18 10.875c0 .621-.504 1.125-1.125 1.125M18 10.875c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125m-12 5.25v-5.25m0 5.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125m-12 0v-1.5c0-.621-.504-1.125-1.125-1.125M18 18.375v-5.25m0 5.25v-1.5c0-.621.504-1.125 1.125-1.125M18 13.125v1.5c0 .621.504 1.125 1.125 1.125M18 13.125c0-.621.504-1.125 1.125-1.125M6 13.125v1.5c0 .621-.504 1.125-1.125 1.125M6 13.125C6 12.504 5.496 12 4.875 12m-1.5 0h1.5m-1.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125M19.125 12h1.5m0 0c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h1.5m14.25 0h1.5"
                    />
                  </svg>
                  Watch Movie
                </button> */}
              </div>
            </div>

            <div className="flex-1">
              <img
                className="my-36 hidden xs:block h-52 sm:h-80 xl:h-96 border-2 border-white mx-auto"
                src={imageFilmDetail}
              ></img>
            </div>
          </div>

          <text className="font-manrope text-4xl font-semibold text-green-600">
            Recommended Movies
          </text>
          <hr className="full-width-underline mb-5 mt-4" />

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 ml-10">
            <PosterFilm image={imageFilm1} name="Meg 2:The Trench" rating={9.5} />
            <PosterFilm image={imageFilm1} name="Meg 2:The Trench" rating={9.5} />
            <PosterFilm image={imageFilm1} name="Meg 2:The Trench" rating={9.5} />
            <PosterFilm image={imageFilm1} name="Meg 2:The Trench" rating={9.5} />
            <PosterFilm image={imageFilm1} name="Meg 2:The Trench" rating={9.5} />
            <PosterFilm image={imageFilm1} name="Meg 2:The Trench" rating={9.5} />
            <PosterFilm image={imageFilm1} name="Meg 2:The Trench" rating={9.5} />
            <PosterFilm image={imageFilm1} name="Meg 2:The Trench" rating={9.5} />
            <PosterFilm image={imageFilm1} name="Meg 2:The Trench" rating={9.5} />
            <PosterFilm image={imageFilm1} name="Meg 2:The Trench" rating={9.5} />
            <PosterFilm image={imageFilm1} name="Meg 2:The Trench" rating={9.5} />
          </div>
        </Container>
      </div>
    </main>
  );
};
