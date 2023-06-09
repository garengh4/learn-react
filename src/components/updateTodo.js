import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router"
import { callUpdateTodoAPI, todosAction } from "../actions/todosActions";

export function UpdateTodo(){

    

    let params = useParams();
    let navigate = useNavigate();
    let todosInfo = useSelector(state=>state.todosInfo);
    let successMessage = todosInfo.successMessage;
    let errorMessage = todosInfo.errorMessage;
    let loggedInUser = useSelector(state=>state.userInfo.loggedInUser);
    let dispatch = useDispatch();
    let allTodos = todosInfo.todos;
    let todoToUpdate = allTodos.find(todo=> todo.id == +params.id);

    useEffect(()=>{
        if (!loggedInUser.username) navigate('/login');
        dispatch(todosAction('updateTodosMessages','','',null));
    },[])

    useEffect(()=>{
        if (successMessage=='Todo Updated') navigate('/todos');
    },[successMessage])

    let [todoBeingEdited,setTodoBeingEdited] = useState(todoToUpdate);

    const handleUpdateTodo = ev=>{
        ev.preventDefault();
        dispatch(callUpdateTodoAPI(allTodos,todoBeingEdited));
    }

    return (
        <div className="col-12 text-center mt-3">
            {successMessage && <div className="alert alert-success">{successMessage}</div>}
            {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
            <form onSubmit={handleUpdateTodo}>
                <input value={todoBeingEdited.description} 
                    onChange={ev=> setTodoBeingEdited({...todoBeingEdited,description:ev.target.value})} />
                <button className="btn btn-sm btn-primary">Update</button>
            </form>
        </div>
    )
}