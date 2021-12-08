import "../../css/prioritySortButton.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChartBar } from "@fortawesome/free-solid-svg-icons"
import "../../css/SectionAddTaskButton.css"
import AppDataController from "../../modules/dataController/AppDataController";


// This is a button that opens the priority sort menu to sort a list of tasks in mobile view.
function PrioritySortButton(props) {
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
    AppDataController.pushSelectedSection(identifier, sortType)
    AppDataController.showPriorityMenu()
}

export default PrioritySortButton