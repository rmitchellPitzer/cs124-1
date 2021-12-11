import "../css/banner.css"
import {auth} from "../App";
import {faUndoAlt} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

// Just a silly banner for the top of the page that shows a play on "toDos"
export default function Header(props) {
    return (
        <div class="banner">
            <button type="button" onClick={() => auth.signOut()}
                    className = "logOutButton"
            >{ faUndoAlt && <FontAwesomeIcon icon= {faUndoAlt}/> }</button>

            <h1 class="title"> Todoiz.IO</h1>
        </div>
    )
}