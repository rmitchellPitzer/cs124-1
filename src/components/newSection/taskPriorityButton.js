import "../../css/prioritySortButton.css"

import TaskDataController from "../../modules/dataController/TaskDataController";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSort, faSortDown, faSortUp } from "@fortawesome/free-solid-svg-icons"
import "../../css/SectionAddTaskButton.css"

// The button to change a task's priority level.
function TaskPriorityButton(props) {
    const sectionText = props.sectionTitle
    let priorityIcon
    if(props.value == 1){
        priorityIcon = faSortDown
    }
    else if (props.value == 2){
        priorityIcon = faSort
    }
    else {
        priorityIcon = faSortUp
    }

    return (
        <button
            aria-label={sectionText ? "Press to change the priority of the tasks in " + sectionText : "Press to change the priority of the tasks in an empty section"}
            class="TaskPriorityButton"
            onClick={ (e) => handleOnClick(props.identifier, props.sectionIdentifier, props.value)}
        >
            <FontAwesomeIcon icon={priorityIcon} />
        </button>
    )
}

function handleOnClick(id, sectionIdentifier, value) {
    TaskDataController.updateTaskPriority(id, sectionIdentifier, value)
}

export default TaskPriorityButton