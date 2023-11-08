import { IconButton } from "@material-tailwind/react";
import { Card, CardBody, Typography } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import moviesActions from "@/actions/movie.action"
import AppFallback from "@/components/AppFallback"
import { useNavigate } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";



export function PopularMovie() {

    const [current, setCurrent] = useState<number>(0);
    const navigate = useNavigate()
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(moviesActions.getMovieByRating(0, 20));
    }, []);

    const MovieByRating = useAppSelector((state) => state.movie.rating.data);

    // Kiểm tra nếu listRecentlyMovies là null hoặc rỗng
    if (MovieByRating === null || MovieByRating.length === 0) {
        return (
            <AppFallback />
        );
    }
    // console.log("MovieByRating", MovieByRating)

    const disablePrev = current == 0;
    const disableNext = current == (MovieByRating.length - 1) - 4;


    const handlePrev = () => {
        current !== 0 && setCurrent((cur) => cur - 1)
    };
    const handleNext = () => {
        current < MovieByRating.length - 1 && setCurrent((cur) => cur + 1)
    };

    const handleDetail = (id: number) => {
        // console.log("IDMovie", id)
        navigate(`/detail/${id}`);
    };

    const formattedRating = (item: number) => {
        return (Number.isInteger(item) ? `${item}.0` : item)
    }

    return (

        <div className="grid h-auto grid-cols-1 ml-12 items-end gap-8 lg:grid-cols-[1fr_5px] relative">
            <div className="w-full max-w-full overflow-hidden">
                <div
                    className="flex gap-5 transition-transform duration-500 ease-out"
                    style={{ transform: `translateX(-${current * (125 + 19.5)}px)` }}
                >
                    {MovieByRating.map((item, index) => (
                        <Card
                            key={`like-${index}`}
                            className={`rounded-none bg-transparent`}
                            onClick={() => handleDetail(item.id)}
                        >
                            <CardBody
                                className="w-[125px] p-0 hover:scale-95 hover:cursor-pointer ease-in-out duration-300 transform disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none">
                                <LazyLoadImage
                                    wrapperClassName="h-[205px] w-full border"
                                    src={item.imageUrl}
                                />
                                <div className="flex items-center absolute text-white text-sm bg-black rounded-lg px-2 py-0.5 right-1 top-1 cursor-pointer">
                                    {formattedRating(item.rating)}
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-yellow-500 ml-0.5">
                                        <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                                    </svg>
                                </div>

                                <div className="mt-1 line-clamp-1">
                                    <Typography
                                        variant="h5"
                                        className="font-manrope text-sm font-extrabold capitalize text-slate-200"
                                    >
                                        {item.title}
                                    </Typography>
                                </div>
                                <div className="line-clamp-1">
                                    <Typography className="font-manrope text-xs capitalize text-slate-300/70">
                                        {item.release}
                                    </Typography>
                                </div>
                            </CardBody>
                        </Card>
                    ))}
                </div>
            </div>

            <div className="flex absolute right-0 -top-12">
                <IconButton
                    variant="text"
                    color="white"
                    size="md"
                    onClick={handlePrev}
                    disabled={disablePrev}
                    className="h-10 w-10 cursor-pointer rounded-full text-slate-600 transition-colors hover:border-slate-400 hover:text-slate-400"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 9l-3 3m0 0l3 3m-3-3h7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>

                </IconButton>
                <IconButton
                    variant="text"
                    color="white"
                    size="md"
                    onClick={handleNext}
                    disabled={disableNext}
                    className="h-10 w-10 cursor-pointer rounded-full text-slate-600 transition-colors hover:border-slate-400 hover:text-slate-400"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12.75 15l3-3m0 0l-3-3m3 3h-7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>

                </IconButton>
            </div>
        </div>
        // <Carousel
        //     className="h-64 w-full content-center"
        //     navigation={({ setActiveIndex, activeIndex, length }) => (
        //         <div className="absolute bottom-4 left-2/4 z-50 flex -translate-x-2/4 gap-2">
        //             {new Array(length).fill("").map((_, i) => (
        //                 <span
        //                     key={i}
        //                     className={`hidden h-1 cursor-pointer rounded-2xl transition-all content-[''] ${activeIndex === i ? "w-8 bg-white" : "w-4 bg-white/50"}`}
        //                     onClick={() => setActiveIndex(i)}
        //                 />
        //             ))}
        //         </div>
        //     )}
        //     prevArrow={({ handlePrev }) => (
        //         <IconButton
        //             variant="text"
        //             color="white"
        //             size="md"
        //             onClick={handlePrev}
        //             className="!absolute top-2/4 left-4 -translate-y-2/4 -ml-3 border-none hover:text-cred "
        //         >
        //             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        //                 <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 9l-3 3m0 0l3 3m-3-3h7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        //             </svg>

        //         </IconButton>
        //     )}
        //     nextArrow={({ handleNext }) => (
        //         <IconButton
        //             variant="text"
        //             color="white"
        //             size="md"
        //             onClick={handleNext}
        //             className="!absolute top-2/4 !right-4 -translate-y-2/4 -mr-3 border-none hover:text-cred"
        //         >
        //             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        //                 <path strokeLinecap="round" strokeLinejoin="round" d="M12.75 15l3-3m0 0l-3-3m3 3h-7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        //             </svg>

        //         </IconButton>
        //     )}
        //     loop
        // >
        //     <div className="flex space-x-5 mx-12">
        //         <PosterFilm image={imageFilm} name="Blue Beetle" rating={9.1} year={2023} />
        //         <PosterFilm image={imageFilm} name="Blue Beetle" rating={9.1} year={2023} />
        //         <PosterFilm image={imageFilm} name="Blue Beetle" rating={9.1} year={2023} />
        //         <PosterFilm image={imageFilm} name="Blue Beetle" rating={9.1} year={2023} />
        //         <PosterFilm image={imageFilm} name="Blue Beetle" rating={9.1} year={2023} />
        //     </div>

        //     <div className="flex space-x-5 mx-12">
        //         <PosterFilm image={imageFilm1} name="Puan" rating={8.7} year={2023} />
        //         <PosterFilm image={imageFilm1} name="Puan" rating={8.7} year={2023} />
        //         <PosterFilm image={imageFilm1} name="Puan" rating={8.7} year={2023} />
        //         <PosterFilm image={imageFilm1} name="Puan" rating={8.7} year={2023} />
        //         <PosterFilm image={imageFilm1} name="Puan" rating={8.7} year={2023} />
        //     </div>

        //     <div className="flex space-x-5 mx-12">
        //         <PosterFilm image={imageFilm2} name="Strays" rating={8.4} year={2023} />
        //         <PosterFilm image={imageFilm2} name="Strays" rating={8.4} year={2023} />
        //         <PosterFilm image={imageFilm2} name="Strays" rating={8.4} year={2023} />
        //         <PosterFilm image={imageFilm2} name="Strays" rating={8.4} year={2023} />
        //         <PosterFilm image={imageFilm2} name="Strays" rating={8.4} year={2023} />
        //     </div>

        // </Carousel >
    );
}