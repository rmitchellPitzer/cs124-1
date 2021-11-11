import "../../css/task.css"
import TaskDataController from "../../modules/dataController/TaskDataController"
/*
props: {
    text:string;
    isCompleted:boolean
    id:string 
}
*/
export default function Task(props) {
    const classes = `task-item ${props.isCompleted ? 'completed' : ''}`
    return (
        <div class={classes}>
            <input 
                alt='task completion status' 
                class='checkbox' 
                type="checkbox"
                value={ props.isCompleted}
                onChange= {(e) => handleCheckBoxEvent(props.id)}
                checked= {props.isCompleted}
            />
            <input 
                class='task-text' 
                type='text' 
                alt='task text' 
                onChange= { (e) => handleTextEvent(props.id,e)}
                value={props.text}
            />
        </div>
    )

}

function handleTextEvent(id,event) {
    const text = event.currentTarget.value
    TaskDataController.updateTaskText(id,text)
}

function handleCheckBoxEvent(id) {
    TaskDataController.toggleTaskCompletion(id)
}