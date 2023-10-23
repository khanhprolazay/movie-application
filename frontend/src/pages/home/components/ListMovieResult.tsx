import imageFilm from "@/assets/imageMovie/blue_beetle_ver3.jpg";
import imageFilm1 from "@/assets/imageMovie/puan.jpg";
import imageFilm2 from "@/assets/imageMovie/strays_ver3.jpg";
import imageFilmDetail from "@/assets/imageMovie/oppenheimer_ver3.jpg";
import PosterFilmResult from "@/pages/home/components/PosterFilmResult"




export function ListMovieResult() {

    return (
        <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 ml-10">
            <PosterFilmResult image={imageFilm1} name="Meg 2:The Trench" rating={9.5} />
            <PosterFilmResult image={imageFilm} name="Meg 2:The Trench" rating={9.5} />
            <PosterFilmResult image={imageFilm2} name="Meg 2:The Trench" rating={9.5} />
            <PosterFilmResult image={imageFilmDetail} name="Meg 2:The Trench" rating={9.5} />
            <PosterFilmResult image={imageFilm} name="Meg 2:The Trench" rating={9.5} />
            <PosterFilmResult image={imageFilm1} name="Meg 2:The Trench" rating={9.5} />
            <PosterFilmResult image={imageFilm2} name="Meg 2:The Trench" rating={9.5} />
            <PosterFilmResult image={imageFilm1} name="Meg 2:The Trench" rating={9.5} />
            <PosterFilmResult image={imageFilm} name="Meg 2:The Trench" rating={9.5} />
            <PosterFilmResult image={imageFilmDetail} name="Meg 2:The Trench" rating={9.5} />
            <PosterFilmResult image={imageFilm1} name="Meg 2:The Trench" rating={9.5} />
            <PosterFilmResult image={imageFilm2} name="Meg 2:The Trench" rating={9.5} />
            <PosterFilmResult image={imageFilm} name="Meg 2:The Trench" rating={9.5} />
            <PosterFilmResult image={imageFilm1} name="Meg 2:The Trench" rating={9.5} />
            <PosterFilmResult image={imageFilm2} name="Meg 2:The Trench" rating={9.5} />
            <PosterFilmResult image={imageFilmDetail} name="Meg 2:The Trench" rating={9.5} />
            <PosterFilmResult image={imageFilm1} name="Meg 2:The Trench" rating={9.5} />
        </div>
    );
}