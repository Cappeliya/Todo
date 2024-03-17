import { AddBox } from "@mui/icons-material";
import { IconButton, TextField } from "@mui/material";
import { ChangeEvent, KeyboardEvent, useState } from "react";

type AddItemFormType = {
    addItem: (title: string) => void;
};
export function AddItemForm(props: AddItemFormType) {

    const [title, setTitle] = useState("");
    const [error, setError] = useState<string | null>(null);


    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value);
    };

    const onKeyPressHandler = ((e: KeyboardEvent<HTMLInputElement>) => {
        setError(null);

        if (e.charCode === 13) {
            props.addItem(title);
            setTitle("");
        }
    });

    const addTask = () => {
        if (title.trim() !== "") {
            props.addItem(title.trim());
            setTitle("");
        } else {
            setError("Title is required");
        }
    };

    return (
        <div>
            <TextField variant="outlined"
                label="Type value"
                value={title}
                onChange={onChangeHandler}
                onKeyPress={onKeyPressHandler}
                error={!!error}
                helperText={error}
            />
            <IconButton onClick={addTask} color="primary" ><AddBox /></IconButton>
        </div>
    );
}
