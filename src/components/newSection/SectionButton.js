import { faAngleDown, faAngleRight } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import TaskDataController from "../../modules/dataController/TaskDataController";
import store from "../../modules/dataController/store";




// SectionButton refers to the arrow button to show taskslist when in mobile view.
// This was considered for desktop and landscape view, but difficult would
// be an understatement in trying to determine scroll length, so that was canned.

function SectionButton(props) {

    const isToggled = store.getState()

    const icon = props.toggledState ? faAngleDown : faAngleRight


    // const sectionText = store.getState().sections.find(section => section.identifier === props.identifier).text
    // // Once again, sectionText is used for the aria-label.

    const ariaText = props.text ? props.text : "an empty "
    // This was used for getting further parameters without a if else statement.


    return (
        <button class="drop-down" onClick={(e) => handleOnClick(props.identifier)}
            aria-label= {props.toggledState ? "click to close" + ariaText + "section": "click to open " + ariaText + "section"}
            >
            <FontAwesomeIcon icon={icon} />
        </button>
    )
}   




function handleOnClick(identifier) {
    TaskDataController.toggleSection(identifier)
}



export default SectionButton