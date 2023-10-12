
interface PosterFilmProps {
    image: string;
    name: string;
    rating: number
}

const PosterFilm = (props: PosterFilmProps) => {

    return (
        <div className="bg-black w-36 mr-7 flex flex-col items-center relative transition-transform transform hover:scale-105">
            <img className="border border-white cursor-pointer" src={props.image} ></img>
            <label className="text-white text-lg cursor-pointer">{props.name}</label>
            <div className="flex items-center absolute text-white text-sm bg-black rounded-lg px-2 py-0.5 right-1 top-1 cursor-pointer">
                {props.rating}
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                    <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                </svg>
            </div>
        </div>
    );
};

export default PosterFilm;
