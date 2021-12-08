import "../../css/task.css"
import TaskDataController from "../../modules/dataController/TaskDataController"
import store from "../../modules/dataController/store";
import TaskPriorityButton from "../newSection/taskPriorityButton";

/*
props: {
    text:string;
    isCompleted:boolean
    id:string 
}
*/

// This creates the individual task for use on mobile displays. It contains a checkbox, and a input text

export default function Task(props) {



    const classes = `task-item`
    const cssID = props.isCompleted ? 'completedTask' : ''



    // Why hello ugly getAria functions that are 80 lines long! I would love to make these cleaner, but currently
    // they do what they need to with getting what needs to be returned to the screenReader, and I have one hour
    // left to turn this in so there it is!

    function getAriaCheckbox(){
        const currentSectionText = props.text
        if (currentSectionText){
            if (props.text){
                if (props.isCompleted){
                    return "This is the checked checkbox for the task " + props.text + " in" + currentSectionText
                }
                else{
                    return "This is the unchecked checkbox for the task " + props.text + " in" + currentSectionText
                }
            }
            else{
                if (props.isCompleted){
                    return "This is the checked checkbox for an empty task in" + currentSectionText
                }
                else{
                    return "This is the unchecked checkbox for an empty task in" + currentSectionText
                }
            }
        }
        else{
            if (props.text){
                if (props.isCompleted){
                    return "This is the checked checkbox for the task " + props.text + " in an empty section."
                }
                else{
                    return "This is the unchecked checkbox for the task " + props.text + " in an empty section."
                }
            }
            else{
                if (props.isCompleted){
                    return "This is the checked checkbox for an empty task in in an empty section."
                }
                else{
                    return "This is the unchecked checkbox for an empty task in an empty section."
                }
            }
        }
        }

    function getAriaTask(){
        const currentSectionText = props.text
        if (currentSectionText){
            if (props.text){
                if (props.isCompleted){
                    return "edit the completed task " + props.text + " in" + currentSectionText + "."
                }
                else{
                    return "edit the uncompleted task " + props.text + " in" + currentSectionText + "."
                }
            }
            else{
                if (props.isCompleted){
                    return "edit the completed empty task in" + currentSectionText + "."
                }
                else{
                    return "edit the uncompleted empty task  in" + currentSectionText + "."
                }
            }
        }
        else{
            if (props.text){
                if (props.isCompleted){
                    return "edit the completed task " + props.text + " in an empty section."
                }
                else{
                    return "edit the uncompleted task " + props.text + " in an empty section."
                }
            }
            else{
                if (props.isCompleted){
                    return "edit a completed empty task in in an empty section."
                }
                else{
                    return "edit a uncompleted empty task in an empty section."
                }
            }
        }
    }


    return (
        <div class={classes} id = {cssID+"markedCompleted"}>
            <input
                aria-label= {getAriaCheckbox()}
                alt='task completion status' 
                class='checkbox' 
                type="checkbox"
                value={ props.isCompleted}
                onChange= {(e) => handleCheckBoxEvent(props.id, props.sectionIdentifier, props.isCompleted)}
                checked= {props.isCompleted}
            />
            <input
                aria-label={getAriaTask()}
                class='task-text' 
                type='text' 
                alt='task text'

                id ={cssID}
                onChange= { (e) => handleTextEvent(props.id, props.sectionIdentifier,e)}
                value={props.text}
                onFocus={(e)=>e.currentTarget.value = props.text}
            />
            <TaskPriorityButton
                sectionTitle = {props.text}
                sectionIdentifier = {props.sectionIdentifier}
                identifier = {props.id}
                value = {props.priority}/>
        </div>
    )

}



function handleTextEvent(id, identifier, event) {
    const newText = event.currentTarget.value
    TaskDataController.updateTaskText(id, identifier, newText)
}

function handleCheckBoxEvent(id, identifier, isToggled) {
    TaskDataController.toggleTaskCompletion(id, identifier, isToggled)
}