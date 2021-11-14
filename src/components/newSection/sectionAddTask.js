import "../../css/bar.css"
import "../../css/todo.css"
import "../../css/completed.css"
import SectionButton from "./SectionButton"
import TaskDataController from "../../modules/dataController/TaskDataController";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlus } from "@fortawesome/free-solid-svg-icons"
import AppDataController from "../../modules/dataController/AppDataController";
import "../../css/SectionAddTaskButton.css"

// This component should be a button that adds tasks to the section's tasklist


function SectionAddTaskButton(props) {
        return (
        <button
            class="add-task-button"
            onClick={ (e) => handleOnClick(props.identifier)}
        >
            <FontAwesomeIcon icon={faPlus} />
        </button>
    )
}

function handleOnClick(props) {
    console.log(props)
    TaskDataController.createTask(props)
}

export default SectionAddTaskButton