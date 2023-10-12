import { Container } from "@/components/container";
// import { Banner } from "@/component/banner";
// import { Navbar } from "@/component/navbar";
import { NavbarWithMegaMenu } from "@/components/navbar";
import PosterFilm from "@/components/posterFilm";
import { FC } from "react";

import imageFilm from "../assets/imageMovie/blue_beetle_ver3.jpg";
import imageFilm1 from "../assets/imageMovie/puan.jpg";
import imageFilm2 from "../assets/imageMovie/strays_ver3.jpg";

export const HomePage: FC = () => {

  return (
    <main className="flex flex-col bg-black">
      <NavbarWithMegaMenu />
      {/* <Banner /> */}
      <Container>
        <div className="relative flex items-center justify-center gap-5">
          <input
            className="my-7 h-11 w-3/4 rounded-3xl bg-gray-300 pl-5 font-manrope text-lg font-semibold text-black placeholder-black"
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
          <select className="my-7 h-11 rounded-3xl bg-gray-300 px-1 text-center font-manrope text-lg font-semibold text-black">
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

        <text className="font-manrope text-3xl font-semibold text-green-600">
          Popular
        </text>
        <hr className="full-width-underline mb-5 mt-4" />
        <div className="mb-7 ml-5 flex">
          <PosterFilm image={imageFilm} name="Blue Beetle" rating={9.1} />
          <PosterFilm image={imageFilm} name="Blue Beetle" rating={9.1} />
          <PosterFilm image={imageFilm} name="Blue Beetle" rating={9.1} />
          <PosterFilm image={imageFilm} name="Blue Beetle" rating={9.1} />
          <PosterFilm image={imageFilm} name="Blue Beetle" rating={9.1} />
          <PosterFilm image={imageFilm} name="Blue Beetle" rating={9.1} />
        </div>

        <text className="font-manrope text-3xl font-semibold text-green-600">
          Recently Added
        </text>
        <hr className="full-width-underline mb-5 mt-4" />
        <div className="mb-7 ml-5 flex">
          <PosterFilm image={imageFilm1} name="Puan" rating={7.7} />
          <PosterFilm image={imageFilm1} name="Puan" rating={7.7} />
          <PosterFilm image={imageFilm1} name="Puan" rating={7.7} />
          <PosterFilm image={imageFilm1} name="Puan" rating={7.7} />
          <PosterFilm image={imageFilm1} name="Puan" rating={7.7} />
          <PosterFilm image={imageFilm1} name="Puan" rating={7.7} />
        </div>

        <text className="font-manrope text-3xl font-semibold text-green-600">
          Recomendations
        </text>
        <hr className="full-width-underline mb-5 mt-4" />
        <div className="mb-10 ml-5 flex">
          <PosterFilm image={imageFilm2} name="Strays" rating={8.5} />
          <PosterFilm image={imageFilm2} name="Strays" rating={8.5} />
          <PosterFilm image={imageFilm2} name="Strays" rating={8.5} />
          <PosterFilm image={imageFilm2} name="Strays" rating={8.5} />
          <PosterFilm image={imageFilm2} name="Strays" rating={8.5} />
          <PosterFilm image={imageFilm2} name="Strays" rating={8.5} />
        </div>
      </Container>
    </main>
  );
};
