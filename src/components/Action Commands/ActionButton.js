import AppDataController from "../../modules/dataController/AppDataController"
import "../../css/action_button.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlus } from "@fortawesome/free-solid-svg-icons"

function handleOnClick() {
    AppDataController.showMenu()
}

export default function ActionButton() {
    return (
        <button 
            class="action-button"
            onClick={handleOnClick}
        >
        <FontAwesomeIcon icon={faPlus} />
        </button>
    )
}

