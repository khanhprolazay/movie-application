import PosterFilmRow from "@/pages/home/components/PosterFilmRow"
import imageFilm from "@/assets/imageMovie/blue_beetle_ver3.jpg";
import imageFilm1 from "@/assets/imageMovie/puan.jpg";
import imageFilm2 from "@/assets/imageMovie/strays_ver3.jpg";
import imageFilmDetail from "@/assets/imageMovie/oppenheimer_ver3.jpg";
import { useAppSelector } from "@/redux/hooks";
import AppFallback from "@/components/AppFallback"
import moviesActions from "@/actions/movie.action"



export function ListPosterFilmRow() {

    // useEffect(() => {
    //   dispatch(moviesActions.getMovieByRandom(0, 5));
    // }, []);

    const MovieByYear = useAppSelector((state) => state.MovieByYear.search.data);
    // const MovieByRandom = useAppSelector((state) => state.MovieByRandom.random.data);

    // Kiểm tra nếu listRecentlyMovies là null hoặc rỗng
    if (MovieByYear === null || MovieByYear.length === 0) {
        return (
            // <AppFallback />
            <div className="text-center mt-20 mb-10">Dữ liệu chưa được cập nhật</div>
        );
    }

    const dataMovie = MovieByYear.slice(0, 5);
    // console.log("dataMovie", dataMovie)

    return (
        <div>
            {dataMovie.map((movie, index: number) => (
                <PosterFilmRow
                    key={index}
                    image={movie.imageUrl}
                    name={movie.title}
                    rating={movie.rating}
                    date={movie.release}
                    duration={movie.movieLength ? movie.movieLength : 120} // Kiểm tra và sử dụng một giá trị mặc định nếu movieLength là undefined
                    genres="Biography, Psychology, Drama"
                    // genres={movie.genres}
                />
            ))}
        </div>
    );
}
