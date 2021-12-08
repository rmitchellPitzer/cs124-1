import ActionMenuItem from "./ActionMenuItem.js"
import "../../css/action_list.css"
import TaskDataController from "../../modules/dataController/TaskDataController.js"
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons"
import AppDataController from "../../modules/dataController/AppDataController.js"
import {collectionName, database} from "../../modules/dataController/firestore";
import {useCollection} from "react-firebase-hooks/firestore";



let fireStoreList = null;

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
    // Resets all sections and tasks, gives an empty section
    TaskDataController.clearAllSectionsAndTasks()

}


const menuItems = [
    // Text, commands, and icons present in the action menu.
    {text: "Add New Section", command: TaskDataController.createSection, icon: faPlus},
    {text: "Clear Completed Tasks", command:deleteAll, icon: faMinus},
    {text: "Clear All Sections And Tasks", command: ClearAll, icon: faMinus}
]

export default function ActionMenu(props) {

    const query = database.collection(collectionName);
    const [value, loading, error] = useCollection(query);
    if (value) {
        fireStoreList = value.docs.map((doc) => {
            return {...doc.data()}});
        TaskDataController.setSectionToStack(fireStoreList)
    }



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