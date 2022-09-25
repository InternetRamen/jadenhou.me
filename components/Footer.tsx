import Icons from "./Icons";

const Footer = () => {
    return (
        <footer>
            <div className="max-w-6xl w-4/5 mx-auto flex items-center justify-center flex-col border-t h-32 mt-1">
                <p className="text-center">
                    Jaden Hou ©️ 2022<br></br>Made with ❤️ in Maryland
                </p>
                <Icons />
            </div>
        </footer>
    );
};
export default Footer;
