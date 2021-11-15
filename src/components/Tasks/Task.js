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
    const classes = `task-item`
    const cssID = props.isCompleted ? 'completedTask' : ''
    return (
        <div class={classes}>
            <input 
                alt='task completion status' 
                class='checkbox' 
                type="checkbox"
                value={ props.isCompleted}
                onChange= {(e) => handleCheckBoxEvent(props.id, props.sectionID)}
                checked= {props.isCompleted}
            />
            <input 
                class='task-text' 
                type='text' 
                alt='task text'
                id ={cssID}
                onChange= { (e) => handleTextEvent(props.id, props.sectionID,e)}
                value={props.text}
            />
        </div>
    )

}

function handleTextEvent(id, identifier, event) {
    const text = event.currentTarget.value
    TaskDataController.updateTaskText(id, identifier, text)
}

function handleCheckBoxEvent(id, identifier) {
    TaskDataController.toggleTaskCompletion(id, identifier)
}