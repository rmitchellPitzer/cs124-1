import ActionMenuItem from "./ActionMenuItem.js"
import "../../css/action_list.css"
import TaskDataController from "../../modules/dataController/TaskDataController.js"
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons"
import AppDataController from "../../modules/dataController/AppDataController.js"


/*
props: {
    menuItems: MenuItem[]
}

menuItem {
    text: string;

    command: Function
}
*/


function deleteAll() {
    // deletes all completed Tasks
    TaskDataController.deleteAllCompleted()
}

function ClearAll() {
    // Resets the tasks and sections to default and shows the undo prompt for three seconds..
    TaskDataController.clearAllSectionsAndTasks()
    AppDataController.showUndo()
    setTimeout( () => {
        AppDataController.hideUndo()
    },3000)
}


const menuItems = [
    // Text, commands, and icons present in the action menu.
    {text: "Add New Section", command: TaskDataController.createSection, icon: faPlus},
    {text: "Clear Completed Tasks", command:deleteAll, icon: faMinus},
    {text: "Clear All Sections And Tasks", command: ClearAll, icon: faMinus}
]

export default function ActionMenu(props) {
    // returns a component that contains the commands listed above.
    return (
        <button class='overlay'onClick= {AppDataController.closeMenu}
            aria-label="Click here to exit the action menu.">
            <div class='action-container'>
                { menuItems.map(menuItem => {
                    return <ActionMenuItem {...menuItem} key={menuItem.text}/>
                })}
            </div>
        </button>
     
    )
}