import { useState } from "react";
import Button from "../Button/Button";
import SelectUser from "../SelectUser/SelectUser";
import Logo from "../Logo/Logo";

const logos = ["/logo.svg", "/react.svg"];

function Header() {
    const [logoIndex, setLogoIndex] = useState(0);

    const toggleLogo = () => {
        setLogoIndex((state) => Number(!Boolean(state)));
    };

    return (
        <>
            <Logo image={logos[logoIndex]} />
            <SelectUser />
            <Button onClick={toggleLogo}>Change Logo</Button>
        </>
    );
}

export default Header;
