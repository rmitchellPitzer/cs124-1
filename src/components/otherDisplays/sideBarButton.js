import { faAngleDown, faAngleRight } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import "../../css/Sidebar.css"
import { connect } from "react-redux"
import AppDataController from "../../modules/dataController/AppDataController"
import TaskDataController from "../../modules/dataController/TaskDataController";


function SideBarButton(props) {
    let sectionToScrollTo = document.getElementById(props.identifier+"list");
    const icon = faAngleRight
    return (
        <div class="SideBarButton" onClick={(e) => handleOnClick(props.identifier)}>
            <FontAwesomeIcon icon={icon} />
        </div>
    )
}




function handleOnClick(identifier) {
    let sectionToScrollTo = document.getElementById(identifier+"list");
    sectionToScrollTo.scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"})
}



export default SideBarButton