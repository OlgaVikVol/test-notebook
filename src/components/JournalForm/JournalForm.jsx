import styles from "./JournalForm.module.css";
import Button from "../Button/Button";
import { useContext, useEffect, useReducer, useRef } from "react";
import cn from "classnames";
import { formReducer, INITIAL_STATE } from "./JournalForm.state";
import Input from "../Input/Input";
import { UserContext } from "../../context/user.context";

function JournalForm({ onSubmit, data, onDelete }) {
    const [formState, dispatchForm] = useReducer(formReducer, INITIAL_STATE);
    const { isValid, isFormReadyToSubmit, values } = formState;
    const titleRef = useRef();
    const dateRef = useRef();
    const postRef = useRef();
    const { userId } = useContext(UserContext);

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
        if (!data) {
            dispatchForm({ type: "CLEAR" });
            dispatchForm({
                type: "SET_VALUE",
                payload: { userId },
            });
        }
        dispatchForm({
            type: "SET_VALUE",
            payload: { ...data },
        });
    }, [data]);

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
            dispatchForm({
                type: "SET_VALUE",
                payload: { userId },
            });
        }
    }, [isFormReadyToSubmit, values, onSubmit, userId]);

    useEffect(() => {
        dispatchForm({
            type: "SET_VALUE",
            payload: { userId },
        });
    }, [userId]);

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

    const deleteJournalItem = () => {
        onDelete(data.id);
        dispatchForm({ type: "CLEAR" });
        dispatchForm({
            type: "SET_VALUE",
            payload: { userId },
        });
    };

    return (
        <form className={styles["journal-form"]} onSubmit={addJournalItem}>
            <div className={styles["form-row"]}>
                <Input
                    type="text"
                    name="title"
                    value={values.title}
                    onChange={onChange}
                    ref={titleRef}
                    placeholder={
                        isValid.title ? "Title..." : "Please add title"
                    }
                    appearance="title"
                    isValid={!isValid.title}
                />
                {data?.id && (
                    <button
                        className={styles["delete"]}
                        type="button"
                        onClick={() => deleteJournalItem()}
                    >
                        <img src="/archive.svg" alt="Delete Button" />
                    </button>
                )}
            </div>
            <div className={styles["form-row"]}>
                <label htmlFor="date" className={styles["form-label"]}>
                    <img src="/calendar.svg" alt="calendar" />
                    <span>Date</span>
                </label>
                <Input
                    id="date"
                    type="date"
                    name="date"
                    value={
                        values.date
                            ? new Date(values.date).toISOString().slice(0, 10)
                            : ""
                    }
                    onChange={onChange}
                    ref={dateRef}
                    isValid={!isValid.date}
                    className={styles["input"]}
                />
            </div>
            <div className={styles["form-row"]}>
                <label htmlFor="tag" className={styles["form-label"]}>
                    <img src="./folder.svg" alt="tags icon" />
                    <span>Tags</span>
                </label>
                <Input
                    id="tag"
                    type="text"
                    name="tag"
                    appearance="text"
                    value={values.tag}
                    onChange={onChange}
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
                className={cn(styles["input"], {
                    [styles["invalid"]]: !isValid.post,
                })}
            />
            <Button>Save</Button>
        </form>
    );
}

export default JournalForm;
