import imageHeader from "../asset/imagePage/header.png"
import logo from "../asset/imagePage/logo.png"

export const Banner = () => {
    return (
        <div className="relative z-10">
            <img className="w-full h-auto" src={imageHeader} />
            <img className="absolute inset-0 m-auto" style={{ marginLeft: "10%", width: "20%" }} src={logo} />
        </div>
    );
};




