import styles from "./JournalForm.module.css";
import Button from "../Button/Button";
import { useEffect, useReducer, useRef } from "react";
import cn from "classnames";
import { formReducer, INITIAL_STATE } from "./JournalForm.state";

function JournalForm({ onSubmit }) {
    const [formState, dispatchForm] = useReducer(formReducer, INITIAL_STATE);
    const { isValid, isFormReadyToSubmit, values } = formState;
    const titleRef = useRef();
    const dateRef = useRef();
    const postRef = useRef();
    
    const focusError = (isValid) => {
        switch (true) {
            case !isValid.title:
                titleRef.current.focus();
                break;
            case !isValid.date:
                dateRef.current.focus();
                break;
            case !isValid.post:
                postRef.current.focus();
                break;
        }
    };

    useEffect(() => {
        let timerId;
        if (!isValid.post || !isValid.date || !isValid.title) {
            focusError(isValid);
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
            dispatchForm({ type: "CLEAR" });
        }
    }, [isFormReadyToSubmit, values, onSubmit]);

    const onChange = (e) => {
        dispatchForm({
            type: "SET_VALUE",
            payload: { [e.target.name]: e.target.value },
        });
    };

    const addJournalItem = (e) => {
        e.preventDefault();

        dispatchForm({ type: "SUBMIT" });
    };

    return (
        <>
            <form className={styles["journal-form"]} onSubmit={addJournalItem}>
                <div>
                    <input
                        type="text"
                        name="title"
                        value={values.title}
                        onChange={onChange}
                        ref={titleRef}
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
                        value={values.date}
                        onChange={onChange}
                        ref={dateRef}
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
                        value={values.tag}
                        onChange={onChange}
                        className={styles.input}
                    />
                </div>
                <textarea
                    name="post"
                    id="post"
                    cols={30}
                    rows={10}
                    value={values.post}
                    onChange={onChange}
                    ref={postRef}
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
