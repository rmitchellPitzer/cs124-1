import { faAngleDown, faAngleRight } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { connect } from "react-redux"
import AppDataController from "../../modules/dataController/AppDataController"
import TaskDataController from "../../modules/dataController/TaskDataController";

function SectionButton(props) {
    console.log("HIIIIIIII!")
    console.log(props.toggledState)
    const icon = props.toggledState ? faAngleDown : faAngleRight
    return (
        <button class="drop-down" onClick={(e) => handleOnClick(props.identifier)}>
            <FontAwesomeIcon icon={icon} />
        </button>
    )
}   




function handleOnClick(identifier) {
    console.log(identifier)
    TaskDataController.toggleSection(identifier)
}

// function mapToState(state,{isToDo}) {
//     return {
//         isOpen:
//             isToDo ? AppDataController.showToDo()
//             : AppDataController.showCompleted()
//         }
// }
//
// export default connect(mapToState)(SectionButton)

export default SectionButton