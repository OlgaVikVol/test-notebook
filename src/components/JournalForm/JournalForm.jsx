import "./JournalForm.css";
import Button from "../Button/Button";
import { useState } from "react";

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
            <form className="journal-form" onSubmit={addJournalItem}>
                <input
                    type="text"
                    name="title"
                    placeholder={
                        formValidState.title ? "Title..." : "Please add title"
                    }
                    className={formValidState.title ? "" : "invalid"}
                />
                <input type="date" name="date" />
                <input type="text" name="tag" />
                <textarea name="text" id="post" cols={30} rows={10} />
                <Button text="Save" />
            </form>
        </>
    );
}

export default JournalForm;
