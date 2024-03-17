import { ChangeEvent } from "react"
import { FilterValuesType } from "./AppWithRedux"
import { AddItemForm } from "./AddItemForm"
import { EditableSpan } from "./EditableSpan"
import { Button, Checkbox, IconButton } from "@mui/material"
import { Delete } from "@mui/icons-material"

export type TaskType = {
    id: string,
    title: string,
    isDone: boolean
}

type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    removeTask: (id: string, todoListId: string) => void
    changeFilter: (value: FilterValuesType, todoListId: string) => void
    addTask: (title: string, todoListId: string) => void
    changeStatus: (taskId: string, isDone: boolean, todoListId: string) => void
    changeTaskTitle: (taskId: string, nweTitle: string, todoListId: string) => void
    filter: FilterValuesType
    removeTodoList: (todoListId: string) => void
    changeTodoListTitle: (todoListId: string, newTitle: string) => void
}

export function TodoList(props: PropsType) {

    const addTask = (title: string) => {
        props.addTask(title, props.id)
    }

    const onAllClickHandler = () => props.changeFilter("all", props.id)
    const onActiveClickHandler = () => props.changeFilter("active", props.id)
    const onCompletedClickHandler = () => props.changeFilter("completed", props.id)

    const removeTodoList = () => {
        props.removeTodoList(props.id);
    }
    const changeTodoListTitle = (newTitle: string) => {
        props.changeTodoListTitle(props.id, newTitle)
    }

    return (
        <div>
            <h3> <EditableSpan title={props.title} onChange={changeTodoListTitle} />
                <IconButton onClick={removeTodoList} aria-label="delete">
                    <Delete />
                </IconButton>
            </h3>
            <AddItemForm addItem={addTask} />
            <ul>
                {
                    props.tasks.map(t => {
                        const onRemoveTask = () => props.removeTask(t.id, props.id)
                        const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            props.changeStatus(t.id, e.currentTarget.checked, props.id)
                        }
                        const onChangeTitleHandler = (newValue: string) => {
                            props.changeTaskTitle(t.id, newValue, props.id)
                        }
                        return <li style={{ listStyleType: "none" }} key={t.id} className={t.isDone === true ? "is-done" : ""}>
                            <Checkbox
                                onChange={onChangeStatusHandler}
                                checked={t.isDone} />
                            <EditableSpan title={t.title}
                                onChange={onChangeTitleHandler} />
                            <IconButton onClick={onRemoveTask} aria-label="delete">
                                <Delete />
                            </IconButton>
                        </li>
                    })
                }
            </ul>
            <div>
                <Button color="primary" variant={props.filter === "all" ? "contained" : "text"}
                    onClick={onAllClickHandler}>All</Button>
                <Button color="primary" variant={props.filter === "active" ? "contained" : "text"}
                    onClick={onActiveClickHandler}>Active</Button>
                <Button color="primary" variant={props.filter === "completed" ? "contained" : "text"}
                    onClick={onCompletedClickHandler}>Completed</Button>
            </div>
        </div >

    )
}

