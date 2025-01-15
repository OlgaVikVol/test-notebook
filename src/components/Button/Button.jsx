import styles from "./Button.module.css";

function Button({ text, onClick }) {
    return (
        <button
            className={`${styles.button} ${styles.accent}`}
            onClick={onClick}
        >
            {text}
        </button>
    );
}

export default Button;
