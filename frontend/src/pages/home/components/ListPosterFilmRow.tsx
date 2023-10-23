import PosterFilmRow from "@/pages/home/components/PosterFilmRow"
import imageFilm from "@/assets/imageMovie/blue_beetle_ver3.jpg";
import imageFilm1 from "@/assets/imageMovie/puan.jpg";
import imageFilm2 from "@/assets/imageMovie/strays_ver3.jpg";
import imageFilmDetail from "@/assets/imageMovie/oppenheimer_ver3.jpg";




export function ListPosterFilmRow() {

    return (
        <div>
            <PosterFilmRow image={imageFilm} name="Blue Beetle" rating={9.1} date="22/12/2022" duration={105} genres="Biography, Psychology, Drama" />
            <PosterFilmRow image={imageFilm1} name="Puan" rating={9.1} date="22/12/2022" duration={105} genres="Biography, Psychology, Drama" />
            <PosterFilmRow image={imageFilm2} name="Strays" rating={9.1} date="22/12/2022" duration={105} genres="Biography, Psychology, Drama" />
            <PosterFilmRow image={imageFilmDetail} name="Oppenheimer" rating={9.1} date="22/12/2022" duration={105} genres="Biography, Psychology, Drama" />
            <PosterFilmRow image={imageFilm1} name="Puan" rating={9.1} date="22/12/2022" duration={105} genres="Biography, Psychology, Drama" />
        </div>
    );
}