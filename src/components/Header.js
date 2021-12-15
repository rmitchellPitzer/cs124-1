import "../css/banner.css"
import {auth} from "../App";
import {faUndoAlt} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

// Just a silly banner for the top of the page that shows a play on "toDos"
// Also includes a log out button on the left side
export default function Header(props) {
    return (
        <div class="banner">
            <button
                aria-label="Press to log out"
                type="button" onClick={() => auth.signOut()}
                    className = "logOutButton"
            >{ faUndoAlt && <FontAwesomeIcon icon= {faUndoAlt}/> }</button>

            <h1 class="title"> Todoiz.IO</h1>
        </div>
    )
}