import PosterFilmResult from "@/pages/home/components/PosterFilmResult"

export function ListMovieResult(data) {
    const dataRelatedMovie = data.data

    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-2 mx-5 mb-10">
            {dataRelatedMovie.map((data, index) => (
                <PosterFilmResult
                    key={index}
                    id={data.id}
                    image={data.imageUrl}
                    name={data.title}
                    rating={data.rating}
                />
            ))}
        </div>

    );
}