import { faAngleDown, faAngleRight } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { connect } from "react-redux"
import AppDataController from "../../modules/dataController/AppDataController"

function SectionButton(props) {
    const icon = props.isOpen ? faAngleDown : faAngleRight
    return (
        <button class="drop-down" onClick={(e) => handleOnClick(props.isToDo)}>
            <FontAwesomeIcon icon={icon} />
        </button>
    )
}   


// a function to add tasks to a section's tasks list.

function addTask(props) {


}



function handleOnClick(isToDo) {
    if (isToDo) {
        AppDataController.toggleTodoList()
    }
    else AppDataController.toggleCompletedList()
}

function mapToState(state,{isToDo}) {
    return {
        isOpen: 
            isToDo ? AppDataController.showToDo() 
            : AppDataController.showCompleted()
        }
}

export default connect(mapToState)(SectionButton)