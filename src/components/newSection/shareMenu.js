import "../../css/prioritySortButton.css"
import "../../css/shareGui.css"
import TaskDataController from "../../modules/dataController/TaskDataController.js"
import { faMinus, faSortAmountUpAlt, faSortAmountDownAlt } from "@fortawesome/free-solid-svg-icons"
import AppDataController from "../../modules/dataController/AppDataController.js"
import store from "../../modules/dataController/store";
import {connect} from "react-redux";
import PriorityMenuItem from "./priorityMenuItem";


// Creates the priority sort menu, includes a list of options to choose from
// includes a title as well to show what sorting is being used.

function ShareMenu(props, selectedSection) {

    return (

    <div>
        <div className="shareTitle">Share a section with a user</div>
        <div className="shareMenuContainer"></div>
        <div className="overlay"
             onClick={() => AppDataController.toggleShareMenu()}></div>
        <input type="email" placeholder="Recipient's email" className="ShareInput" id="EmailValue3"/>
        <button className="ShareButton"
                onClick={() => handleOnClick((document.getElementById('EmailValue3').value))}
        >Share!</button>
    </div>)

}

function handleOnClick(email) {
    console.log(email)
    console.log("The email it's being shared with")
    TaskDataController.shareTask(email)
}


export default ShareMenu