import { Container } from "@/components/container";
// import { Banner } from "@/component/banner";
import { NavbarWithMegaMenu } from "@/components/navbar";
import PosterFilm from "@/components/posterFilm";
import { FC } from "react";

import imageFilm1 from "../assets/imageMovie/meg_two_the_trench_ver3.jpg";

export const SearchPage: FC = () => {
  return (
    <main className="relative flex flex-col bg-black">
      {/* <Banner /> */}
      <NavbarWithMegaMenu />
      <Container>
        <div className="relative flex items-center justify-center gap-5">
          <input
            className="my-7 h-11 w-3/4 rounded-3xl bg-gray-300 pl-5 text-lg font-semibold text-black placeholder-black"
            placeholder="Search for a Movie"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="absolute right-60 h-5 w-5 cursor-pointer text-black"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
          <select className="my-7 h-11 rounded-3xl bg-gray-300 px-1 text-center text-lg font-semibold text-black">
            <option value="" selected>
              Genre
            </option>
            <option value="">Action</option>
            <option value="">Adventure</option>
            <option value="">Science Fiction</option>
            <option value="">Romantic</option>
            <option value="">Comedy</option>
            <option value="">Thriller</option>
            <option value="">Detective</option>
          </select>
        </div>

        <text className="font-manrope text-4xl font-semibold text-green-600">
          Search Results
        </text>
        <hr className="full-width-underline mb-5 mt-4" />
        <div className="mb-10 ml-5 grid grid-cols-6 gap-4">
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
    </main>
  );
};
