import { TaskType, TodoList } from './TodoList'
import { AddItemForm } from './AddItemForm';
import { AppBar, Box, Button, Container, Grid, IconButton, Paper, Toolbar, Typography } from '@mui/material';
import { addTodoListAC, changeTodoListFilterAC, changeTodoListTitleAC, removeTodoListAC } from './state/todolist-reducer';
import { addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAС } from './state/tasksReducer';
import { useDispatch, useSelector } from 'react-redux';
import { AppRootState } from './state/store';

export type FilterValuesType = "all" | "completed" | "active";

export type TodoListType = {
  id: string
  title: string
  filter: FilterValuesType
}

export type TasksStateType = {
  [key: string]: Array<TaskType>
}

export function AppWithRedux() {

  const dispatch = useDispatch();
  const todoLists = useSelector<AppRootState, Array<TodoListType>>(state => state.todoLists)
  const tasks = useSelector<AppRootState, TasksStateType>(state => state.tasks)

  function removeTask(id: string, todoListId: string) {
    dispatch(removeTaskAС(id, todoListId));
  }

  function addTask(title: string, todoListId: string) {
    dispatch(addTaskAC(title, todoListId));
  }

  function changeStatus(taskId: string, isDone: boolean, todoListId: string) {
    dispatch(changeTaskStatusAC(taskId, isDone, todoListId));
  }

  function changeTaskTitle(taskId: string, newTitle: string, todoListId: string) {
    dispatch(changeTaskTitleAC(taskId, newTitle, todoListId));
  }

  function changeTodoListTitle(id: string, newTitle: string) {
    dispatch(changeTodoListTitleAC(id, newTitle));
  }

  function changeFilter(value: FilterValuesType, todoListId: string) {
    dispatch(changeTodoListFilterAC(value, todoListId));
  }

  function removeTodoList(todoListId: string) {
    const action = removeTodoListAC(todoListId);
    dispatch(action);
  }

  function addTodoList(title: string) {
    const action = addTodoListAC(title);
    dispatch(action);
  }

  return (
    <div className='App'>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              To-do list
            </Typography>
            <Button color="inherit">Login</Button>
          </Toolbar>
        </AppBar>
      </Box>
      <Container fixed>
        <Grid container style={{ padding: "15px" }}  >
          <Paper style={{ padding: "5px" }} elevation={3} >
            <AddItemForm addItem={addTodoList} />
          </Paper>
        </Grid>
        <Grid container spacing={3}>
          {
            todoLists.map((tl) => {
              let taskForTodoList = tasks[tl.id];
              if (tl.filter === "completed") {
                taskForTodoList = taskForTodoList.filter(t => t.isDone === true);
              }
              if (tl.filter === "active") {
                taskForTodoList = taskForTodoList.filter(t => t.isDone === false);
              }
              return <Grid item>
                <Paper style={{ padding: "15px" }} elevation={3}>
                  <TodoList
                    key={tl.id}
                    id={tl.id}
                    title={tl.title}
                    tasks={taskForTodoList}
                    removeTask={removeTask}
                    changeFilter={changeFilter}
                    addTask={addTask}
                    changeStatus={changeStatus}
                    filter={tl.filter}
                    removeTodoList={removeTodoList}
                    changeTodoListTitle={changeTodoListTitle}
                    changeTaskTitle={changeTaskTitle}
                  />
                </Paper>
              </Grid>
            })
          }
        </Grid>
      </Container>
    </div>
  )
}
