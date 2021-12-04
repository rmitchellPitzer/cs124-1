import "../../css/bar.css"
import "../../css/todo.css"
import "../../css/completed.css"

import TaskDataController from "../../modules/dataController/TaskDataController";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlus } from "@fortawesome/free-solid-svg-icons"
import "../../css/SectionAddTaskButton.css"
import store from "../../modules/dataController/store";


function SectionAddTaskButton(props) {
    // This is a component inside a section's bar that adds a task to the associated section.


    // sectionText gets the text of the section, needed because sections are identified by a uuid.
    // this is used to determine whether the sectionText is empty, because the screenreader needs to know
    // if a section title is empty instead of just skipping over it.
    const sectionText = props.sectionTitle

        return (
        <button
            aria-label={sectionText ? "Press to add a task to " + sectionText : "Press to add a task to an empty section"}
            class="add-task-button"
            onClick={ (e) => handleOnClick(props.identifier)}
        >
            <FontAwesomeIcon icon={faPlus} />
        </button>
    )
}

function handleOnClick(props) {
    TaskDataController.createTask(props)
}

export default SectionAddTaskButton