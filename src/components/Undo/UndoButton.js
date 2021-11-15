import "../../css/action_button.css"
import AppDataController from "../../modules/dataController/AppDataController"

function undoTask() {
    AppDataController.undoTask()
    AppDataController.hideUndo()
}

export default function UndoButton() {
    return (
        <div class="undo">
            <p> Items cleared</p>
            <button alt="undo task clear" onClick={undoTask}> Undo </button>
        </div >
    )
}


