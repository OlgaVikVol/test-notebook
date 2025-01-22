import { forwardRef } from "react";
import styles from "./Input.module.css";
import cn from "classnames";

const Input = forwardRef(function Input(
    { className, isValid, appearance, ...props },
    ref
) {
    return (
        <input
            ref={ref}
            className={cn(className, {
                [styles["invalid"]]: isValid,
                [styles["input-title"]]: appearance == "title",
                [styles["input"]]: appearance == "text",
            })}
            {...props}
        />
    );
});

export default Input;
