import "../../css/action_button.css"
import AppDataController from "../../modules/dataController/AppDataController"




function undoTask() {
    AppDataController.undoTask()
    AppDataController.hideUndo()
}


// Creates the component undoButton. On click it'll show the undo button, and hide it after three seconds.
// This isn't being used anymore, will try to get rid of this and other redundant code in lab5.
export default function UndoButton() {
    return (
        <div class="undo"
            aria-label="Press here to undo the last action.">
            <p> Items cleared</p>
            <button alt="undo task clear" onClick={undoTask}> Undo </button>
        </div >
    )
}


