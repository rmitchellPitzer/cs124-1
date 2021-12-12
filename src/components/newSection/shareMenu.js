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
var clicked

var validEmail
function ShareMenu(props, selectedSection) {

    function handleOnClick(email) {
        window.clicked = true
        if (ValidateEmail(email) === true) {
            TaskDataController.shareTask(email)
            setTimeout(() => {
                window.clicked = false
                window.validEmail = true
            }, 3000)
        }
        else{
            window.validEmail = false
            setTimeout(() => {
                window.validEmail = true
            }, 3000)
        }
    }

    if (clicked === true){
        if (window.validEmail === true) {
            return (
                <div className="shareMenuOrientation">
                    <div className="shareMenuContainer">
                        <div className="shareTitle">Shared the section with the user provided!</div>
                        <input type="email" placeholder="Recipient's email" className="ShareInput" id="EmailValue3"/>
                        <button className="ShareButton"
                                onClick={() =>
                                    handleOnClick((document.getElementById('EmailValue3').value))}>
                            Share!</button>
                    </div>
                    <div className="overlay"
                         onClick={() => AppDataController.toggleShareMenu()}></div>

                </div>)
        }
        else{
            return (
                <div className="shareMenuOrientation">
                    <div className="shareMenuContainer">
                        <div className="shareTitle">Please provide a valid email!</div>
                        <input type="email" placeholder="Recipient's email" className="ShareInput" id="EmailValue3"/>
                        <button className="ShareButton"
                                onClick={() =>
                                    handleOnClick((document.getElementById('EmailValue3').value))}>
                            Share!</button>
                    </div>
                    <div className="overlay"
                         onClick={() => AppDataController.toggleShareMenu()}></div>

                </div>)
        }

    }
    else{
        return (

            <div className="shareMenuOrientation">
                <div className="shareMenuContainer">
                    <div className="shareTitle">Share this section with a user</div>
                    <input type="email" placeholder="Recipient's email" className="ShareInput" id="EmailValue3"/>
                    <button className="ShareButton"
                            onClick={() =>
                                handleOnClick((document.getElementById('EmailValue3').value))}>
                        Share!</button>
                </div>
                <div className="overlay"
                     onClick={() => AppDataController.toggleShareMenu()}></div>

            </div>)
    }

}

function ValidateEmail(input) {
    // used code from https://www.simplilearn.com/tutorials/javascript-tutorial/email-validation-in-javascript
    let validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (input.match(validRegex)) {
        return true;
    }
    else {
        return false;
    }
}





export default ShareMenu