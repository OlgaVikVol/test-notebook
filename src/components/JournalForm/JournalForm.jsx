import styles from "./JournalForm.module.css";
import Button from "../Button/Button";
import { useState } from "react";
import cn from "classnames";

function JournalForm({ onSubmit }) {
    const [formValidState, setFormValidState] = useState({
        title: true,
        post: true,
        date: true,
    });
    const addJournalItem = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const formProps = Object.fromEntries(formData);
        let isValid = true;
        if (!formProps.title?.trim().length) {
            setFormValidState((state) => ({ ...state, title: false }));
            isValid = false;
        } else {
            setFormValidState((state) => ({ ...state, title: true }));
        }
        if (!formProps.text?.trim().length) {
            setFormValidState((state) => ({ ...state, post: false }));
            isValid = false;
        } else {
            setFormValidState((state) => ({ ...state, post: true }));
        }
        if (!formProps.date) {
            setFormValidState((state) => ({ ...state, date: false }));
            isValid = false;
        } else {
            setFormValidState((state) => ({ ...state, date: true }));
        }
        if (!isValid) {
            return;
        }
        onSubmit(formProps);
    };

    return (
        <>
            <form className={styles["journal-form"]} onSubmit={addJournalItem}>
                <div>
                    <input
                        type="text"
                        name="title"
                        placeholder={
                            formValidState.title
                                ? "Title..."
                                : "Please add title"
                        }
                        className={cn(styles["input-title"], {
                            [styles["invalid"]]: !formValidState.title,
                        })}
                    />
                </div>
                <div className={styles["form-row"]}>
                    <label for="date" className={styles["form-label"]}>
                        <img src="/calendar.svg" alt="calendar" />
                        <span>Date</span>
                    </label>
                    <input
                        id="date"
                        type="date"
                        name="date"
                        className={`${styles.input} ${
                            formValidState.date ? "" : styles["invalid"]
                        }`}
                    />
                </div>
                <div className={styles["form-row"]}>
                    <label for="tag" className={styles["form-label"]}>
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
                        formValidState.post ? "" : styles["invalid"]
                    }`}
                />
                <Button text="Save" />
            </form>
        </>
    );
}

export default JournalForm;
