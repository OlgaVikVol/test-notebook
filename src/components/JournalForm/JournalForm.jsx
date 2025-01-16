import styles from "./JournalForm.module.css";
import Button from "../Button/Button";
import { useEffect, useReducer } from "react";
import cn from "classnames";
import { formReducer, INITIAL_STATE } from "./JournalForm.state";

function JournalForm({ onSubmit }) {
    const [formState, dispatchForm] = useReducer(formReducer, INITIAL_STATE);
    const { isValid, isFormReadyToSubmit, values } = formState;

    useEffect(() => {
        let timerId;
        if (!isValid.post || !isValid.date || !isValid.title) {
            timerId = setTimeout(() => {
                dispatchForm({ type: "RESET_VALIDITY" });
            }, 2000);
        }

        return () => {
            clearTimeout(timerId);
        };
    }, [isValid]);

    useEffect(() => {
        if (isFormReadyToSubmit) {
            onSubmit(values);
        }
    }, [isFormReadyToSubmit]);

    const addJournalItem = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const formProps = Object.fromEntries(formData);
        console.log("Form Props:", formProps);
        dispatchForm({ type: "SUBMIT", payload: formProps });
    };

    return (
        <>
            <form className={styles["journal-form"]} onSubmit={addJournalItem}>
                <div>
                    <input
                        type="text"
                        name="title"
                        placeholder={
                            isValid.title ? "Title..." : "Please add title"
                        }
                        className={cn(styles["input-title"], {
                            [styles["invalid"]]: !isValid.title,
                        })}
                    />
                </div>
                <div className={styles["form-row"]}>
                    <label htmlFor="date" className={styles["form-label"]}>
                        <img src="/calendar.svg" alt="calendar" />
                        <span>Date</span>
                    </label>
                    <input
                        id="date"
                        type="date"
                        name="date"
                        className={`${styles.input} ${
                            isValid.date ? "" : styles["invalid"]
                        }`}
                    />
                </div>
                <div className={styles["form-row"]}>
                    <label htmlFor="tag" className={styles["form-label"]}>
                        <img src="./folder.svg" alt="tags icon" />
                        <span>Tags</span>
                    </label>
                    <input
                        id="tag"
                        type="text"
                        name="tag"
                        className={styles.input}
                    />
                </div>
                <textarea
                    name="text"
                    id="post"
                    cols={30}
                    rows={10}
                    className={`${styles.input} ${
                        isValid.post ? "" : styles["invalid"]
                    }`}
                />
                <Button text="Save" />
            </form>
        </>
    );
}

export default JournalForm;
