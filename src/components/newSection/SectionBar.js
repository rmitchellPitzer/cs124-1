import "../../css/bar.css"
import SectionButton from "./SectionButton"
import TaskDataController from "../../modules/dataController/TaskDataController";
import sectionAddTask from "./sectionAddTask";
import SectionAddTaskButton from "./sectionAddTask";





export default function SectionBar(props) {
    let cssID;
    const classes = `bar ${props.identifier}`
    if (props.identifier !== 'toDo' && props.identifier !== 'completed'){
        cssID = "otherSections";
    }
    else{
        cssID = props.identifier;
    }
    const checkIfTypeIsCompleted = props.identifier !== "completed"
    return (
        <div class={classes}>
            <SectionButton identifier = {props.identifier}
                           toggledState = {props.isToggled}/>
            <input
                class="bar-title"
                id={cssID}
                // class="bar-title"
                type='text'
                alt='task text'
                // alt='Section text'
                onChange= { (e) => handleTextEvent(props.identifier,e)}
                value={props.sectionTitle}
            />
            {checkIfTypeIsCompleted && <SectionAddTaskButton
                identifier = {props.identifier}/>}
        </div>  
    )
}

function handleTextEvent(id,event) {
    const text = event.currentTarget.value
    TaskDataController.updateSectionText(id,text)
}