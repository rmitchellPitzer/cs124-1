import "../../css/bar.css"
import "../../css/todo.css"
import "../../css/completed.css"
import SectionButton from "./SectionButton"
import TaskDataController from "../../modules/dataController/TaskDataController";




function handleTextEvent(id,event) {
    const text = event.currentTarget.value
    console.log(text)
    TaskDataController.updateSectionText(id,text)
}


export default function SectionBar(props) {
    const classes = `bar ${props.className}`
    return (
        <div class={classes}>
            <SectionButton isToDo = { props.className === "todo-bar" }/>
            <input
                class="bar-title"
                type='text'
                alt='Section text'
                onChange= { (e) => handleTextEvent(props.identifier,e)}
                value={props.sectionTitle}/>
        </div>  
    )
}