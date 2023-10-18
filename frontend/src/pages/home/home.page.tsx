import { Container } from "@/components/container";
import { Header } from "@/components/Header";
import PosterFilm from "@/components/PosterFilm";
import { FC } from "react";

import imageFilm from "@/assets/imageMovie/blue_beetle_ver3.jpg";
import imageFilm1 from "@/assets/imageMovie/puan.jpg";
import imageFilm2 from "@/assets/imageMovie/strays_ver3.jpg";
import { useAppDispatch } from "@/redux/hooks";
import genreActions from "@/actions/genre.action";
import { Option, Select } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";

export const HomePage: FC = () => {
  // const dispatch = useAppDispatch();

  // dispatch(genreActions.getGenres())

  const navigate = useNavigate()

  const handleSearch = () => {
    navigate("/search")
  }

  return (
    <main className="flex flex-col">
      <Header />
      <Container>
        <div className="flex items-center gap-5 justify-center">
          <div className="relative w-3/4">
            <input
              className="my-7 h-11 w-full rounded-3xl bg-gray-300 pl-5 font-manrope text-base font-semibold text-black placeholder-black"
              placeholder="Search for a Movie"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="absolute right-7 top-10 h-5 w-5 cursor-pointer text-black hover:text-red-500"
              onClick={handleSearch}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
          </div>
          <div className="hidden md:block w-12 sm:w-auto">
            <Select label="Select Genre"
              className="bg-gray-300 font-manrope font-semibold text-lg rounded-3xl border-none h-11">
              <Option className="font-manrope font-semibold text-sm"> Action </Option>
              <Option className="font-manrope font-semibold text-sm"> Adventure </Option>
              <Option className="font-manrope font-semibold text-sm"> Science Fiction </Option>
              <Option className="font-manrope font-semibold text-sm"> Romantic </Option>
              <Option className="font-manrope font-semibold text-sm"> Comedy </Option>
              <Option className="font-manrope font-semibold text-sm"> Thriller </Option>
              <Option className="font-manrope font-semibold text-sm"> Detective </Option>
            </Select>
          </div>
        </div>

        <div className="font-manrope text-2xl font-semibold text-green-600">
          Popular
        </div>
        <hr className="full-width-underline mb-5 mt-4" />
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 ml-12">
          <PosterFilm image={imageFilm} name="Blue Beetle" rating={9.1} />
          <PosterFilm image={imageFilm} name="Blue Beetle" rating={9.1} />
          <PosterFilm image={imageFilm} name="Blue Beetle" rating={9.1} />
          <PosterFilm image={imageFilm} name="Blue Beetle" rating={9.1} />
          <PosterFilm image={imageFilm} name="Blue Beetle" rating={9.1} />
          <PosterFilm image={imageFilm} name="Blue Beetle" rating={9.1} />
        </div>

        <text className="font-manrope text-2xl font-semibold text-green-600">
          Recently Added
        </text>
        <hr className="full-width-underline mb-5 mt-4" />
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 ml-12">
          <PosterFilm image={imageFilm1} name="Puan" rating={7.7} />
          <PosterFilm image={imageFilm1} name="Puan" rating={7.7} />
          <PosterFilm image={imageFilm1} name="Puan" rating={7.7} />
          <PosterFilm image={imageFilm1} name="Puan" rating={7.7} />
          <PosterFilm image={imageFilm1} name="Puan" rating={7.7} />
          <PosterFilm image={imageFilm1} name="Puan" rating={7.7} />
        </div>

        <text className="font-manrope text-2xl font-semibold text-green-600">
          Recomendations
        </text>
        <hr className="full-width-underline mb-5 mt-4" />
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 ml-12">
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
