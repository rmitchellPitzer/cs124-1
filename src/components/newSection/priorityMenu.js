import "../../css/prioritySortButton.css"
import TaskDataController from "../../modules/dataController/TaskDataController.js"
import { faCaretDown, faCaretUp, faMinus } from "@fortawesome/free-solid-svg-icons"
import AppDataController from "../../modules/dataController/AppDataController.js"
import {collectionName, database} from "../../modules/dataController/firestore";
import {useCollection} from "react-firebase-hooks/firestore";
import store from "../../modules/dataController/store";
import {connect} from "react-redux";
import PriorityMenuItem from "./priorityMenuItem";
import Task from "../Tasks/Task";



let fireStoreList = null;

let selectedSort = null;


// const menuItems = [
//     // Text, commands, and icons present in the action menu.
//     {text: "A-Z", command: TaskDataController, icon: faPlus},
//     {text: "Priority Levels", command:deleteAll, icon: faMinus},
//     {text: "Date Created", command: ClearAll, icon: faMinus},
//     {text: "Reset Sort", command: ClearAll, icon: faMinus}
// ]
function sortType(){
    return(store.getState().selectedSection.sortType)
}


function alphaSort() {
    let sortValue = store.getState().selectedSection.sortType
    if(sortValue === 1){
        TaskDataController.setSectionPriority(2)
    }
    else{
        TaskDataController.setSectionPriority(1)
    }
}

function dateSort() {
    let sortValue = store.getState().selectedSection.sortType
    if(sortValue === 3){
        TaskDataController.setSectionPriority(4)
    }
    else{
        TaskDataController.setSectionPriority(3)
    }
}

function prioritySort() {
    let sortValue = store.getState().selectedSection.sortType
    if(sortValue === 5){
        TaskDataController.setSectionPriority(6)
    }
    else{
        TaskDataController.setSectionPriority(5)
    }
}

function resetSort() {
    console.log(sortType())
    TaskDataController.setSectionPriority(7)
}






function PriorityMenu(props, selectedSection) {

    let menuItems = [
        // Text, commands, and icons present in the action menu.
        {text: "A-Z", command:alphaSort, icon: sortType() == 1 ? faCaretDown: faCaretUp},
        {text: "Priority Levels", command:prioritySort, icon: sortType() == 5 ? faCaretDown: faCaretUp},
        {text: "Date Created", command: dateSort, icon: sortType() == 3 ? faCaretDown: faCaretUp},
        {text: "Reset Sort", command: resetSort, icon: faMinus}
    ]

    // returns a component that contains the commands listed above.
    return (
        <button class='overlay'onClick= {AppDataController.hidePriorityMenu}
                aria-label="Click here to exit the action menu.">
            <div class='action-container'>
                { menuItems.map(menuItem => {
                    return <PriorityMenuItem {...menuItem} key={menuItem.text}/>
                })}
            </div>
        </button>

    )
}

function mapStateToProps(state){
    return{
        selectedSection: store.getState().selectedSection,
}}

export default connect(mapStateToProps)(PriorityMenu)