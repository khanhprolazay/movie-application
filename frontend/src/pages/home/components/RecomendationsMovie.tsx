import { Carousel, IconButton } from "@material-tailwind/react";
import PosterFilm from "@/components/PosterFilm"
import imageFilm from "@/assets/imageMovie/blue_beetle_ver3.jpg";
import imageFilm1 from "@/assets/imageMovie/puan.jpg";
import imageFilm2 from "@/assets/imageMovie/strays_ver3.jpg";


export function RecomendationsMovie() {
    return (
        <Carousel
            className="h-64 w-full content-center"
            navigation={({ setActiveIndex, activeIndex, length }) => (
                <div className="absolute bottom-4 left-2/4 z-50 flex -translate-x-2/4 gap-2">
                    {new Array(length).fill("").map((_, i) => (
                        <span
                            key={i}
                            className={`hidden h-1 cursor-pointer rounded-2xl transition-all content-[''] ${activeIndex === i ? "w-8 bg-white" : "w-4 bg-white/50"}`}
                            onClick={() => setActiveIndex(i)}
                        />
                    ))}
                </div>
            )}

            prevArrow={({ handlePrev }) => (
                <IconButton
                    variant="text"
                    color="white"
                    size="md"
                    onClick={handlePrev}
                    className="!absolute top-2/4 left-4 -translate-y-2/4 -ml-3 border-none hover:text-cred "
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 9l-3 3m0 0l3 3m-3-3h7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>

                </IconButton>
            )}
            nextArrow={({ handleNext }) => (
                <IconButton
                    variant="text"
                    color="white"
                    size="md"
                    onClick={handleNext}
                    className="!absolute top-2/4 !right-4 -translate-y-2/4 -mr-3 border-none hover:text-cred"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12.75 15l3-3m0 0l-3-3m3 3h-7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>

                </IconButton>
            )}
            loop
        >
            <div className="flex space-x-5 mx-12">
                <PosterFilm image={imageFilm2} name="Strays" rating={8.4} year={2023} />
                <PosterFilm image={imageFilm2} name="Strays" rating={8.4} year={2023} />
                <PosterFilm image={imageFilm2} name="Strays" rating={8.4} year={2023} />
                <PosterFilm image={imageFilm2} name="Strays" rating={8.4} year={2023} />
                <PosterFilm image={imageFilm2} name="Strays" rating={8.4} year={2023} />
            </div>

            <div className="flex space-x-5 mx-12">
                <PosterFilm image={imageFilm1} name="Puan" rating={8.7} year={2023} />
                <PosterFilm image={imageFilm1} name="Puan" rating={8.7} year={2023} />
                <PosterFilm image={imageFilm1} name="Puan" rating={8.7} year={2023} />
                <PosterFilm image={imageFilm1} name="Puan" rating={8.7} year={2023} />
                <PosterFilm image={imageFilm1} name="Puan" rating={8.7} year={2023} />
            </div>

            <div className="flex space-x-5 mx-12">
                <PosterFilm image={imageFilm} name="Blue Beetle" rating={9.1} year={2023} />
                <PosterFilm image={imageFilm} name="Blue Beetle" rating={9.1} year={2023} />
                <PosterFilm image={imageFilm} name="Blue Beetle" rating={9.1} year={2023} />
                <PosterFilm image={imageFilm} name="Blue Beetle" rating={9.1} year={2023} />
                <PosterFilm image={imageFilm} name="Blue Beetle" rating={9.1} year={2023} />
            </div>


        </Carousel >
    );
}