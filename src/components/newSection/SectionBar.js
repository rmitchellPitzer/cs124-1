import "../../css/bar.css"
import "../../css/todo.css"
import "../../css/completed.css"
import SectionButton from "./SectionButton"
import TaskDataController from "../../modules/dataController/TaskDataController";
import sectionAddTask from "./sectionAddTask";
import SectionAddTaskButton from "./sectionAddTask";





export default function SectionBar(props) {
    const classes = `bar ${props.className}`
    return (
        <div class={classes}>
            <SectionButton identifier = {props.identifier}
                           toggledState = {props.isToggled}/>
            <input
                class="task-text"
                // class="bar-title"
                type='text'
                alt='task text'
                // alt='Section text'
                onChange= { (e) => handleTextEvent(props.identifier,e)}
                value={props.sectionTitle}
            />
            <SectionAddTaskButton
                identifier = {props.identifier}/>
        </div>  
    )
}

function handleTextEvent(id,event) {
    const text = event.currentTarget.value
    TaskDataController.updateSectionText(id,text)
}