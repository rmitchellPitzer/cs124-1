import { faAngleDown, faAngleRight } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import TaskDataController from "../../modules/dataController/TaskDataController";
import store from "../../modules/dataController/store";
import AppDataController from "../../modules/dataController/AppDataController";
import { connect } from "react-redux"
import completedSection from "./completedSection";



// SectionButton refers to the arrow button to show taskslist when in mobile view.
// This was considered for desktop and landscape view, but difficult would
// be an understatement in trying to determine scroll length, so that was canned.

function CompletedSectionButton(props) {

    const isToggled = store.getState().showCompletedTasks

    const icon = isToggled ? faAngleDown : faAngleRight


    // const sectionText = store.getState().sections.find(section => section.identifier === props.identifier).text
    // // Once again, sectionText is used for the aria-label.

    const ariaText = props.text ? props.text : "an empty "
    // This was used for getting further parameters without a if else statement.


    return (
        <button class="drop-down" onClick={(e) => handleOnClick()}
                aria-label= {props.toggledState ? "click to close" + ariaText + "section": "click to open " + ariaText + "section"}
        >
            <FontAwesomeIcon icon={icon} />
        </button>
    )
}




function handleOnClick() {
    console.log("Pressed")
    console.log(store.getState().showCompletedTasks)
    AppDataController.toggleCompletedSection()
}

function mapStateToProps(state){
    return{
        isToggled: store.getState().showCompletedTasks}
}

export default connect(mapStateToProps)(CompletedSectionButton)
