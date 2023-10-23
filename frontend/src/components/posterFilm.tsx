import { useNavigate } from "react-router-dom";

interface PosterFilmProps {
    image: string;
    name: string;
    rating: number;
    year: number
}

const PosterFilm = (props: PosterFilmProps) => {

    const navigate = useNavigate()

    const handleDetail = () => {
        navigate("/detail")
    }

    const maxCharacters = 12.5; // Độ dài tối đa trước khi cắt

    const truncateText = (text: string) => {
        if (text.length > maxCharacters) {
            return (text.slice(0, maxCharacters - 2) + '...');
        }
        return text;
    };

    return (
        <div
            className="h-56 w-1/5 object-cover relative"
            onClick={handleDetail}
        >
            <img
                src={props.image}
                alt="image 1"
                className="border h-52 w-full object-cover hover:cursor-pointer hover:scale-105 ease-in-out duration-300 transform disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none"
            />
            <div className="flex items-center absolute text-white text-sm bg-black rounded-lg px-2 py-0.5 right-1 top-1 cursor-pointer">
                {props.rating}
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-yellow-500">
                    <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                </svg>
            </div>
            <h2 className="absolute -bottom-4 text-md text-gray-200/80 font-manrope font-semibold hover:cursor-pointer hover:text-slate-100">{truncateText(props.name)}</h2>
            <h2 className="absolute -bottom-8 text-xs text-gray-500 font-manrope font-semibold">{props.year}</h2>
        </div>
    );
};

export default PosterFilm;
