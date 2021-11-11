


/* 


props: {
    text: string;
    command: Function
    parameters: string
    icon: FontAwesomeIcon
}
*/

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function ActionMenuItem(props) {
    return (
        <button onClick={() => props.command(props)} class="action-item">
            { props.icon && <FontAwesomeIcon icon= {props.icon}/> }
            <div class="action-text">
                <p> {props.text} </p>
            </div>
        </button>
    )
}

