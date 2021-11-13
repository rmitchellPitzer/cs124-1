import "../../css/bar.css"
import "../../css/todo.css"
import "../../css/completed.css"
import SectionButton from "./SectionButton"
import TaskDataController from "../../modules/dataController/TaskDataController";

export default function AddTasksToSection(props) {
    const classes = `bar ${props.className}`
    return (
        <div class={classes}>
            <SectionButton isToDo = { props.className === "completed-bar" }/>
            <input
                class="task-text"
                // class="bar-title"
                type='text'
                alt='task text'
                // alt='Section text'
                onChange= { (e) => handleTextEvent(props.identifier,e)}
                value={props.sectionTitle}
            />
        </div>
    )
}

