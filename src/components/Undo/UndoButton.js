import "../../css/action_button.css"
import AppDataController from "../../modules/dataController/AppDataController"




function undoTask() {
    AppDataController.undoTask()
    AppDataController.hideUndo()
}


// Creates the component undoButton. On click it'll show the undo button, and hide it after three seconds.
export default function UndoButton() {
    return (
        <div class="undo"
            aria-label="Press here to undo the last action.">
            <p> Items cleared</p>
            <button alt="undo task clear" onClick={undoTask}> Undo </button>
        </div >
    )
}


