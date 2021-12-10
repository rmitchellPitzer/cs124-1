import {collectionName, database} from "../../modules/dataController/firestore";
import {useCollection} from "react-firebase-hooks/firestore";
import TaskDataController from "../../modules/dataController/TaskDataController";
import AppDataController from "../../modules/dataController/AppDataController";
import ActionMenuItem from "../Action Commands/ActionMenuItem";
import "../../css/verifyEmail.css"

export default function VerifyYourEmail(props) {

    // returns a component that contains the commands listed above.

    // <button type="button" onClick={() => auth.signOut()}>Logout</button>
    // {!user.emailVerified && <button type="button" onClick={verifyEmail}>Verify email</button>}



    return (
        <div className="verifyEmailBanner">
            <div className="verifyEmailText">
                You need to verify your email before accessing sections. Click here to send a verification email!
            </div>
        </div>

    )
}
