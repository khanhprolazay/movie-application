import PosterFilmResult from "@/pages/home/components/PosterFilmResult"

export function ListMovieResult(data: any) {
    const dataRelatedMovie = data.data

    return (
        <div className="no-scrollbar flex overflow-x-scroll gap-4 mx-5 mb-10">
            {dataRelatedMovie.map((data: any, index: number) => (
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