import "../../css/bar.css"
import SectionButton from "./SectionButton"
import TaskDataController from "../../modules/dataController/TaskDataController";
import SectionAddTaskButton from "./sectionAddTask";



// This is the section bar, it contains a button for showing tasklists, an input for editing the section title, and
// a button to add tasks.
// A task Add button was considered for the completed tasks section, but this turned out to be a logistical headache
// as completed tasks when checked uncompleted would return to it's origin, the completed tasks section.
    // a uncompleted task in a completed task section.

export default function SectionBar(props) {
    let cssID;

    // cssID determines if the section is the To do section, completed section, or an added section.

    const classes = `bar ${props.identifier}`
    if (props.identifier !== 'toDo' && props.identifier !== 'completed'){
        cssID = "otherSections";
    }
    else{
        cssID = props.identifier; // props.identifier contains either "toDo", "completed", or some uuid string.
    }

    const checkIfTypeIsCompleted = props.identifier !== "completed"


    return (
        <div class={classes} id={"bar" + props.identifier}>
            <SectionButton identifier = {props.identifier}
                           toggledState = {props.isToggled}/>
            <input
                aria-label={props.sectionTitle ? "Edit the section title of" + props.sectionTitle : "Edit the title of an empty section"}
                class="bar-title"
                id={cssID}
                type='text'
                alt='task text'
                onChange= { (e) => handleTextEvent(props.identifier,e)}
                value={props.sectionTitle}
            />
            {/*The code below determines whether the section is completed, and will hide the addTaskButton if it is.*/}
            {checkIfTypeIsCompleted && <SectionAddTaskButton
                identifier = {props.identifier}/>}
        </div>  
    )
}

function handleTextEvent(id,event) {
    const text = event.currentTarget.value
    TaskDataController.updateSectionText(id,text)
}