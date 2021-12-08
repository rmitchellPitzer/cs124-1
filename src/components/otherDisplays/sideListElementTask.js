import TaskDataController from "../../modules/dataController/TaskDataController"
import "../../css/sideList.css"
import store from "../../modules/dataController/store";

/*
props: {
    text:string;
    isCompleted:boolean
    id:string
}
*/

// this is the sidelistelementtask, which creates the tasks inside the sidelist.

export default function SideListElementTask(props) {
    const cssID = props.isCompleted ? 'completedTask' : ''


    //I felt that, as messy as this code is, I needed to account for any variables when running a screenReader.
    // For instance, if a task was empty, was there another way to identify it? Shouldn't the section name also
    // be returned when using a screen reader?
    // While very ugly, this means that almost all possible cases have been accounted for.

    function getAriaCheckbox(){
        // returns what should be said in the screenReader when the checkbox is focused.

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
        // returns what should be said in the screenReader when the task input text is focused.

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

    console.log(props)
    return (
        <div class="SideListElementTask" id = {cssID+"markedCompleted"}>
            <input
                aria-label= {getAriaCheckbox()}
                alt='task completion status'
                class='sideListCheckbox'
                type="checkbox"
                value={ props.isCompleted}
                onChange= {(e) => handleCheckBoxEvent(props.id, props.sectionIdentifier)}
                checked= {props.isCompleted}
            />
            <input
                aria-label={getAriaTask()}
                class='SideListElementTaskText'
                type='text'
                alt='task text'
                id ={cssID}
                onChange= { (e) => handleTextEvent(props.id, props.sectionIdentifier,e)}
                value={props.text}
            />
        </div>
    )

}

function handleTextEvent(id, identifier, event) {
    const text = event.currentTarget.value
    TaskDataController.updateTaskText(id, identifier, text)
}

function handleCheckBoxEvent(id, identifier, isToggled) {
    TaskDataController.toggleTaskCompletion(id, identifier, isToggled)
}