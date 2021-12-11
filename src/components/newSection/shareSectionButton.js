import "../../css/prioritySortButton.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faShareAlt } from "@fortawesome/free-solid-svg-icons"
import "../../css/SectionAddTaskButton.css"
import AppDataController from "../../modules/dataController/AppDataController";


// This is a button that opens the priority sort menu to sort a list of tasks in mobile view.
function ShareSectionButton(props) {
    const sectionText = props.sectionTitle

    return (
        <button
            aria-label={sectionText ? "Press to share the section " + sectionText : "Press to share the unnamed section"}
            class="shareSectionButton"
            onClick={ (e) => handleOnClick(props.identifier, props.sharedWith)}
        >
            <FontAwesomeIcon icon={faShareAlt} />
        </button>
    )
}

function handleOnClick(identifier, sharedWith) {
    AppDataController.pushSelectedSection(identifier, sharedWith)
    AppDataController.toggleShareMenu()
}

export default ShareSectionButton