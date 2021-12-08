import "../../css/bar.css"
import SectionButton from "./SectionButton"
import TaskDataController from "../../modules/dataController/TaskDataController";
import SectionAddTaskButton from "./sectionAddTask";
import PrioritySortButton from "./priorityButton";



// This is the section bar, it contains a button for showing tasklists, an input for editing the section title, and
// a button to add tasks.
// A task Add button was considered for the completed tasks section, but this turned out to be a logistical headache
// as completed tasks when checked uncompleted would return to it's origin, the completed tasks section.
    // a uncompleted task in a completed task section.

export default function SectionBar(props) {
    let cssID;

    // cssID determines if the section is the To do section, completed section, or an added section.
    // lab3 update: There is so much redundant code here and I have 2 days to finish lab5 and I am
    // Worried I will not have time to clean this up later so, whatever!

    const classes = `bar ${props.identifier}`
    if (props.identifier !== 'toDo' && props.identifier !== 'completed'){
        cssID = "otherSections";
    }
    else{
        cssID = props.identifier; // props.identifier contains either "toDo", "completed", or some uuid string.
    }


    // This will return a section bar, containing a button to open and close the tasks,
    // the section's input box itself.
    // The priority sort button to sort tasks by priority
    // the add task button to add tasks to the section
    return (
        <div class={classes} id={"bar" + props.identifier}>
            <SectionButton identifier = {props.identifier}
                           toggledState = {props.isToggled}
                            text = {props.sectionTitle}/>
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
            <PrioritySortButton
                identifier = {props.identifier}
                sectionTitle = {props.sectionTitle}
                sortType = {props.sortType}/>
            {<SectionAddTaskButton
                identifier = {props.identifier}
                sectionTitle = {props.sectionTitle}/>}
        </div>  
    )
}

function handleTextEvent(id,event) {
    const text = event.currentTarget.value
    TaskDataController.updateSectionText(id,text)
}