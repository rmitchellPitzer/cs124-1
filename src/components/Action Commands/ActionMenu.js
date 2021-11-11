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
    TaskDataController.deleteAllCompleted()
    AppDataController.showUndo()
    setTimeout( () => {
        AppDataController.hideUndo()
    },3000)
}


const menuItems = [
    {text:"Add Task", command: ()=> TaskDataController.createTask("toDo"), icon: faPlus},
    {text: "Add New Section", command: TaskDataController.createSection, icon: faPlus},
    {text: "Clear Completed Tasks", command:deleteAll, icon: faMinus},
]

export default function ActionMenu(props) {
    return (
        <div class='overlay'onClick= {AppDataController.closeMenu}>
            <div class='action-container'>
                { menuItems.map(menuItem => {
                    return <ActionMenuItem {...menuItem} key={menuItem.text}/>
                })}
            </div>
        </div>
     
    )
}