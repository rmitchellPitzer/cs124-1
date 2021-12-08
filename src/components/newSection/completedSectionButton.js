import { faAngleDown, faAngleRight } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import store from "../../modules/dataController/store";
import AppDataController from "../../modules/dataController/AppDataController";
import { connect } from "react-redux"



// SectionButton refers to the arrow button to show taskslist when in mobile view.
// This was considered for desktop and landscape view, but difficult would
// be an understatement in trying to determine scroll length, so that was canned.

function CompletedSectionButton(props) {

    const isToggled = store.getState().showCompletedTasks

    const icon = isToggled ? faAngleDown : faAngleRight

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
    AppDataController.toggleCompletedSection()
}

function mapStateToProps(state){
    return{
        isToggled: store.getState().showCompletedTasks}
}

export default connect(mapStateToProps)(CompletedSectionButton)
