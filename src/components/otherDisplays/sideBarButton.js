import { faAngleDown, faAngleRight } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import "../../css/Sidebar.css"
import { connect } from "react-redux"
import AppDataController from "../../modules/dataController/AppDataController"
import TaskDataController from "../../modules/dataController/TaskDataController";

function SideBarButton(props) {
    const icon = faAngleDown
    return (
        <button class="SideBarButton" onClick={(e) => handleOnClick(props.identifier)}>
            <FontAwesomeIcon icon={icon} />
        </button>
    )
}




function handleOnClick(identifier) {
    console.log(identifier)
}



export default SideBarButton