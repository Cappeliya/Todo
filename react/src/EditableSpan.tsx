import { ChangeEvent, useState } from "react";

type EditableSpanPropsType = {
    title: string;
    onChange: (newValue: string) => void
};


export function EditableSpan(props: EditableSpanPropsType) {
    const [editMode, setEditMode] = useState(false);
    const [title, setTitle] = useState("");

    const activatEditMod = () => {
        setEditMode(true);
        setTitle(props.title)
    };
    const activatVieMod = () => {
        setEditMode(false);
        props.onChange(title)
    }

    const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) =>
        setTitle(e.currentTarget.value);

    return editMode
        ? <input value={title}
            onBlur={activatVieMod}
            onChange={onChangeTitleHandler}
            autoFocus />
        : <span onDoubleClick={activatEditMod}>{props.title}</span>;
}
