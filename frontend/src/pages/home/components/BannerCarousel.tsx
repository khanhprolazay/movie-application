import { Carousel, IconButton } from "@material-tailwind/react";

export function BannerCarousel() {
    return (
        <Carousel
            className="h-48 w-full content-center rounded"
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
                    className="!absolute top-2/4 left-4 -translate-y-2/4 ml-1"
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
                    className="!absolute top-2/4 !right-4 -translate-y-2/4 mr-1"
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
            autoplayDelay={4000}
        >
            <div className="flex space-x-5">
                <div className="h-44 w-1/2 object-cover relative hover:cursor-pointer hover:scale-105 ease-in-out duration-300 transform disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none">
                    <img
                        src="https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2560&q=80"
                        alt="image 1"
                        className="h-44 w-full rounded"
                    />
                    <text className="absolute left-3 bottom-6 text-xl text-white font-manrope font-semibold hover:cursor-pointer">Tên Phim</text>
                    <text className="absolute left-3 bottom-1 text-sm text-white font-manrope font-semibold hover:cursor-pointer">Năm sản xuất</text>
                </div>
                <div className="h-44 w-1/2 object-cover relative hover:cursor-pointer hover:scale-105 ease-in-out duration-300 transform disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none">
                    <img
                        src="https://images.unsplash.com/photo-1493246507139-91e8fad9978e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80"
                        alt="image 2"
                        className="h-44 w-full rounded"
                    />
                    <text className="absolute left-3 bottom-6 text-xl text-white font-manrope font-semibold hover:cursor-pointer">Tên Phim</text>
                    <text className="absolute left-3 bottom-1 text-sm text-white font-manrope font-semibold hover:cursor-pointer">Năm sản xuất</text>
                </div>
            </div>

            <div className="flex space-x-5">
                <div className="h-44 w-1/2 object-cover relative hover:cursor-pointer hover:scale-105 ease-in-out duration-300 transform disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none">
                    <img
                        src="https://images.unsplash.com/photo-1518623489648-a173ef7824f3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2762&q=80"
                        alt="image 1"
                        className="h-44 w-full rounded"
                    />
                    <text className="absolute left-3 bottom-6 text-xl text-white font-manrope font-semibold hover:cursor-pointer">Tên Phim</text>
                    <text className="absolute left-3 bottom-1 text-sm text-white font-manrope font-semibold hover:cursor-pointer">Năm sản xuất</text>
                </div>
                <div className="h-44 w-1/2 object-cover relative hover:cursor-pointer hover:scale-105 ease-in-out duration-300 transform disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none">
                    <img
                        src="https://images.unsplash.com/photo-1493246507139-91e8fad9978e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80"
                        alt="image 2"
                        className="h-44 w-full rounded"
                    />
                    <text className="absolute left-3 bottom-6 text-xl text-white font-manrope font-semibold hover:cursor-pointer">Tên Phim</text>
                    <text className="absolute left-3 bottom-1 text-sm text-white font-manrope font-semibold hover:cursor-pointer">Năm sản xuất</text>
                </div>
            </div>

            <div className="flex space-x-5">
                <div className="h-44 w-1/2 object-cover relative hover:cursor-pointer hover:scale-105 ease-in-out duration-300 transform disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none">
                    <img
                        src="https://images.unsplash.com/photo-1518623489648-a173ef7824f3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2762&q=80"
                        alt="image 1"
                        className="h-44 w-full rounded"
                    />
                    <text className="absolute left-3 bottom-6 text-xl text-white font-manrope font-semibold hover:cursor-pointer">Tên Phim</text>
                    <text className="absolute left-3 bottom-1 text-sm text-white font-manrope font-semibold hover:cursor-pointer">Năm sản xuất</text>
                </div>
                <div className="h-44 w-1/2 object-cover relative hover:cursor-pointer hover:scale-105 ease-in-out duration-300 transform disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none">
                    <img
                        src="https://images.unsplash.com/photo-1493246507139-91e8fad9978e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80"
                        alt="image 2"
                        className="h-44 w-full rounded"
                    />
                    <text className="absolute left-3 bottom-6 text-xl text-white font-manrope font-semibold hover:cursor-pointer">Tên Phim</text>
                    <text className="absolute left-3 bottom-1 text-sm text-white font-manrope font-semibold hover:cursor-pointer">Năm sản xuất</text>
                </div>
            </div>

            <div className="flex space-x-5">
                <div className="h-44 w-1/2 object-cover relative hover:cursor-pointer hover:scale-105 ease-in-out duration-300 transform disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none">
                    <img
                        src="https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2560&q=80"
                        alt="image 1"
                        className="h-44 w-full rounded"
                    />
                    <text className="absolute left-3 bottom-6 text-xl text-white font-manrope font-semibold hover:cursor-pointer">Tên Phim</text>
                    <text className="absolute left-3 bottom-1 text-sm text-white font-manrope font-semibold hover:cursor-pointer">Năm sản xuất</text>
                </div>
                <div className="h-44 w-1/2 object-cover relative hover:cursor-pointer hover:scale-105 ease-in-out duration-300 transform disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none">
                    <img
                        src="https://images.unsplash.com/photo-1518623489648-a173ef7824f3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2762&q=80"
                        alt="image 2"
                        className="h-44 w-full rounded"
                    />
                    <text className="absolute left-3 bottom-6 text-xl text-white font-manrope font-semibold hover:cursor-pointer">Tên Phim</text>
                    <text className="absolute left-3 bottom-1 text-sm text-white font-manrope font-semibold hover:cursor-pointer">Năm sản xuất</text>
                </div>
            </div>
        </Carousel >
    );
}