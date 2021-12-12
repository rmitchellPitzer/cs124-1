import "../../css/prioritySortButton.css"
import "../../css/shareGui.css"
import TaskDataController from "../../modules/dataController/TaskDataController.js"
import AppDataController from "../../modules/dataController/AppDataController.js"
import store from "../../modules/dataController/store";
import {connect} from "react-redux";

// Creates the share menu, which gives some text, an input box,
// and a button to share sections with an email.

function ShareMenu(props, selectedSection) {
    // Validation for emails are done in the reducer, checks if the email provided is a email and not some
    // weird text.
    return (
        <div className="shareMenuOrientation">
            <div className="shareMenuContainer">
                {props.isValidEmail &&
                !props.isPressed &&
                <div className="shareTitle">Share this section with another user!</div>}

                {!props.isValidEmail &&
                props.isPressed &&
                <div className="shareTitle">Please enter a valid email address!</div>}

                {props.isValidEmail &&
                props.isPressed &&
                <div className="shareTitle">The section has been shared with the user!</div>}


                <input type="email" placeholder="Recipient's email" className="ShareInput" id="EmailValue3"/>
                <button className="ShareButton"
                        onClick={() =>
                            handleOnClick((document.getElementById('EmailValue3').value))}>
                    Share!</button>
            </div>
            <div className="overlay"
                 onClick={() => AppDataController.toggleShareMenu()}></div>

        </div>)




    function handleOnClick(email) {
        AppDataController.setValidShareEmail(email)
        AppDataController.setSharedWithEmail(true)

        if (store.getState().validShareEmail) {
            TaskDataController.shareTask(email)
            setTimeout(() => {
                AppDataController.setValidShareEmail("ryderm123456@gmail.com")
                AppDataController.setSharedWithEmail(false)
            }, 3000)
        }
        else{
            setTimeout(() => {
                AppDataController.setValidShareEmail("example@gmail.com")
                AppDataController.setSharedWithEmail(false)
            }, 3000)
        }
    }


}

function mapStateToProps(state){
    return{
        isValidEmail: store.getState().validShareEmail,
        isPressed: store.getState().shareEmailPressed}
}



export default connect(mapStateToProps)(ShareMenu)