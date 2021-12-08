


/*


props: {
    text: string;
    command: Function
    parameters: string
    icon: FontAwesomeIcon
}
*/

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function PriorityMenuItem(props) {
    // creates a button in the action menu with a command from props.
    return (
        <button onClick={() => props.command(props)} class="action-item"
                aria-label={"This is the" + props.text + "button in the action menu, Press to perform the action." }>
            { props.icon && <FontAwesomeIcon icon= {props.icon}/> }
            <div class="action-text">
                <p> {props.text} </p>
            </div>
        </button>
    )
}

