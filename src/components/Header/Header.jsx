import SelectUser from "../SelectUser/SelectUser";
import styles from "./Header.module.css";

function Header() {
    const changeUser = (e) => {
        console.log(e.target.value);
    };

    return (
        <>
            <img className={styles.logo} src="/logo.svg" alt="Logo" />
            <SelectUser changeUser={changeUser} />
        </>
    );
}

export default Header;
