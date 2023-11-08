import { Carousel, IconButton } from "@material-tailwind/react";

export function BannerCarousel() {

    return (
        <Carousel
            className="h-32 sm:h-44 md:h-48 w-full content-center rounded"
            navigation={({ setActiveIndex, activeIndex, length }) => (
                <div className="absolute bottom-0 left-2/4 z-50 flex -translate-x-2/4 gap-2">
                    {new Array(length).fill("").map((_, i) => (
                        <span
                            key={i}
                            className={`block h-1 cursor-pointer rounded-2xl transition-all content-[''] ${activeIndex === i ? "w-8 bg-white" : "w-4 bg-white/50"}`}
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
                    className="!absolute top-2/4 left-4 -translate-y-2/4 ml-1 hidden"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        className="h-6 w-6"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                        />
                    </svg>
                </IconButton>
            )}
            nextArrow={({ handleNext }) => (
                <IconButton
                    variant="text"
                    color="white"
                    size="md"
                    onClick={handleNext}
                    className="!absolute top-2/4 !right-4 -translate-y-2/4 mr-1 hidden"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        className="h-6 w-6"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                        />
                    </svg>
                </IconButton>
            )}
            loop
            autoplay
            autoplayDelay={6000}
        >
            <div className="flex space-x-5 w-[95%] mx-auto">
                <a
                    // href="https://phimmoiyyy.net/phim-le/chuyen-la-thon-hoang-mieu"
                    className="h-28 sm:h-36 md:h-44 w-1/2 object-cover relative hover:cursor-pointer hover:opacity-50 ease-in-out duration-300 transform disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none">
                    <img
                        src="https://image.tmdb.org/t/p/w500/gZIoyMQlDKyODYHaPEUdmIuZIom.jpg"
                        alt="image 2"
                        className="h-28 sm:h-36 md:h-44 w-full rounded border"
                    />
                    <h1 className="absolute left-3 bottom-6 text-xs sm:text-sm md:text-base lg:text-xl text-white font-manrope font-bold hover:cursor-pointer">Chuyện Lạ Thôn Hoàng Miếu</h1>
                    <h1 className="absolute left-3 bottom-1 text-xs md:text-sm lg:text-base text-white font-manrope font-bold hover:cursor-pointer">2023</h1>
                </a>
                <a
                    // href="https://phimmoiyyy.net/phim-le/an-mang-o-venice-166118"
                    className="h-28 sm:h-36 md:h-44 w-1/2 object-cover relative hover:cursor-pointer hover:opacity-50 ease-in-out duration-300 transform disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none">
                    <img
                        src="https://image.tmdb.org/t/p/w500/69d8whnfJJnuxocrSLSdnqE38zV.jpg"
                        alt="image 1"
                        className="h-28 sm:h-36 md:h-44 w-full rounded border"
                    />
                    <h1 className="absolute left-3 bottom-6 text-xs sm:text-sm md:text-base lg:text-xl text-white font-manrope font-bold hover:cursor-pointer">Án Mạng Ở Venice</h1>
                    <h1 className="absolute left-3 bottom-1 text-xs md:text-sm lg:text-base text-white font-manrope font-bold hover:cursor-pointer">2023</h1>
                </a>

            </div>

            <div className="flex space-x-5 w-[95%] mx-auto">
                <a
                    // href="https://phimmoiyyy.net/phim-le/ca-map-di-bien"
                    className="h-28 sm:h-36 md:h-44 w-1/2 object-cover relative hover:cursor-pointer hover:opacity-50 ease-in-out duration-300 transform disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none">
                    <img
                        src="https://image.tmdb.org/t/p/w500/oXn36crGvHQMTg33o417FVhrtYK.jpg"
                        alt="image 1"
                        className="h-28 sm:h-36 md:h-44 w-full rounded border"
                    />
                    <h1 className="absolute left-3 bottom-6 text-xs sm:text-sm md:text-base lg:text-xl text-white font-manrope font-bold hover:cursor-pointer">Cá Mập Dị Biến</h1>
                    <h1 className="absolute left-3 bottom-1 text-xs md:text-sm lg:text-base text-white font-manrope font-bold hover:cursor-pointer">2023</h1>
                </a>
                <a
                    // href="https://phimmoiyyy.net/phim-le/quai-vat-kinh-di"
                    className="h-28 sm:h-36 md:h-44 w-1/2 object-cover relative hover:cursor-pointer hover:opacity-50 ease-in-out duration-300 transform disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none">
                    <img
                        // src={MovieByYear[0].imageUrl}
                        src="https://image.tmdb.org/t/p/w500/qgSlGJurPzgSHKYlqBiDmr3vjrc.jpg"
                        alt="image 1"
                        className="h-28 sm:h-36 md:h-44 w-full rounded border"
                    />
                    <h1 className="absolute left-3 bottom-6 text-xs sm:text-sm md:text-base lg:text-xl text-white font-manrope font-bold hover:cursor-pointer">Quái vật kinh dị</h1>
                    <h1 className="absolute left-3 bottom-1 text-xs md:text-sm lg:text-base text-white font-manrope font-bold hover:cursor-pointer">2011</h1>
                </a>
            </div>

            <div className="flex space-x-5 w-[95%] mx-auto">
                <a
                    // href="https://phimmoiyyy.net/phim-le/tru-ta"
                    className="h-28 sm:h-36 md:h-44 w-1/2 object-cover relative hover:cursor-pointer hover:opacity-50 ease-in-out duration-300 transform disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none">
                    <img
                        src="https://image.tmdb.org/t/p/w500/cMkXMGmHG5q3sWbuzPyp5lCbFMe.jpg"
                        alt="image 2"
                        className="h-28 sm:h-36 md:h-44 w-full rounded border"
                    />
                    <h1 className="absolute left-3 bottom-6 text-xs sm:text-sm md:text-base lg:text-xl text-white font-manrope font-bold hover:cursor-pointer">Trừ Tà</h1>
                    <h1 className="absolute left-3 bottom-1 text-xs md:text-sm lg:text-base text-white font-manrope font-bold hover:cursor-pointer">2023</h1>
                </a>
                <a
                    // href="https://phimmoiyyy.net/phim-le/vo-tinh"
                    className="h-28 sm:h-36 md:h-44 w-1/2 object-cover relative hover:cursor-pointer hover:opacity-50 ease-in-out duration-300 transform disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none">
                    <img
                        src="https://image.tmdb.org/t/p/w500/r9S8NeS9iTQalegyHiYmkA1byQX.jpg"
                        alt="image 2"
                        className="h-28 sm:h-36 md:h-44 w-full rounded border"
                    />
                    <h1 className="absolute left-3 bottom-6 text-xs sm:text-sm md:text-base lg:text-xl text-white font-manrope font-bold hover:cursor-pointer">Võ Tình</h1>
                    <h1 className="absolute left-3 bottom-1 text-xs md:text-sm lg:text-base text-white font-manrope font-bold hover:cursor-pointer">2023</h1>
                </a>
            </div>

            <div className="flex space-x-5 w-[95%] mx-auto">
                <a
                    // href="https://phimmoiyyy.net/phim-le/nu-tu-tu-than"
                    className="h-28 sm:h-36 md:h-44 w-1/2 object-cover relative hover:cursor-pointer hover:opacity-50 ease-in-out duration-300 transform disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none">
                    <img
                        src="https://image.tmdb.org/t/p/w500/eF6pkcpzxDCaQnJhaRlKdhhQebB.jpg"
                        alt="image 1"
                        className="h-28 sm:h-36 md:h-44 w-full rounded border"
                    />
                    <text className="absolute left-3 bottom-6 text-xs sm:text-sm md:text-base lg:text-xl text-white font-manrope font-bold hover:cursor-pointer">Nữ Tu Tử Thần</text>
                    <text className="absolute left-3 bottom-1 text-xs md:text-sm lg:text-base text-white font-manrope font-bold hover:cursor-pointer">2023</text>
                </a>
                <a
                    // href="https://phimmoiyyy.net/phim-le/quy-am-tin-do"
                    className="h-28 sm:h-36 md:h-44 w-1/2 object-cover relative hover:cursor-pointer hover:opacity-50 ease-in-out duration-300 transform disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none">
                    <img
                        src="https://image.tmdb.org/t/p/w500/azD31DjpV3PJfjF3h72LVw2WCSD.jpg"
                        alt="image 2"
                        className="h-28 sm:h-36 md:h-44 w-full rounded border"
                    />
                    <text className="absolute left-3 bottom-6 text-xs sm:text-sm md:text-base lg:text-xl text-white font-manrope font-bold hover:cursor-pointer">Quỷ Ám: Tín Đồ</text>
                    <text className="absolute left-3 bottom-1 text-xs md:text-sm lg:text-base text-white font-manrope font-bold hover:cursor-pointer">2023</text>
                </a>
            </div>
        </Carousel >
    );
}