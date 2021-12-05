import AppDataController from "../../modules/dataController/AppDataController"
import "../../css/action_button.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlus } from "@fortawesome/free-solid-svg-icons"

function handleOnClick() {
    AppDataController.showMenu()
}

// Action button in the bottom right corner, allows access to adding sections, clearing completed tasks, or
    // resetting the sections and tasks.

export default function ActionButton() {
    return (
        <button
            aria-label="Click here to hear more options."
            class="action-button"
            onClick={handleOnClick}
        >
        <FontAwesomeIcon icon={faPlus} />
        </button>
    )
}

