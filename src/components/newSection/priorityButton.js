import "../../css/prioritySortButton.css"

import TaskDataController from "../../modules/dataController/TaskDataController";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChartBar } from "@fortawesome/free-solid-svg-icons"
import "../../css/SectionAddTaskButton.css"
import store from "../../modules/dataController/store";
import AppDataController from "../../modules/dataController/AppDataController";


function PrioritySortButton(props) {
    // This is a component inside a section's bar that opens a menu to sort that specific section's tasks
    const sectionText = props.sectionTitle

    return (
        <button
            aria-label={sectionText ? "Press to sort the tasks in " + sectionText : "Press to sort the tasks in an empty section"}
            class="prioritySortButton"
            onClick={ (e) => handleOnClick(props.identifier, props.sortType)}
        >
            <FontAwesomeIcon icon={faChartBar} />
        </button>
    )
}

function handleOnClick(identifier, sortType) {
    console.log(store.getState().selectedSection)
    console.log("Pressed!")
    console.log(identifier)
    console.log(sortType)
    AppDataController.pushSelectedSection(identifier, sortType)
    AppDataController.showPriorityMenu()
}

export default PrioritySortButton