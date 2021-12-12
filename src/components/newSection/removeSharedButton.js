import "../../css/prioritySortButton.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMinus } from "@fortawesome/free-solid-svg-icons"
import "../../css/SectionAddTaskButton.css"
import AppDataController from "../../modules/dataController/AppDataController";

// This is a button that opens the remove Section menu to remove your access to a section.
function RemoveSectionSharedButton(props) {
    const sectionText = props.sectionTitle

    return (
        <button
            aria-label={sectionText ? "Press to share the section " + sectionText : "Press to share the unnamed section"}
            class="shareSectionButton"
            onClick={ (e) => handleOnClick(props.identifier, props.sharedWith)}
        >
            <FontAwesomeIcon icon={faMinus} />
        </button>
    )
}

function handleOnClick(identifier, sharedWith) {
    AppDataController.pushSelectedSection(identifier, sharedWith)
    AppDataController.toggleShowRemove()
}

export default RemoveSectionSharedButton