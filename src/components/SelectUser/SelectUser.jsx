import styles from "./SelectUser.module.css";

function SelectUser() {
    const changeUser = (e) => {
        console.log(e.target.value);
    };

    return (
        <select name="user" id="user" onChange={changeUser}>
            <option value="1">Tom</option>
            <option value="2">Jerry</option>
        </select>
    );
}

export default SelectUser;
