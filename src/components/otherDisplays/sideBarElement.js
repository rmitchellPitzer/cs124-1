import { connect } from "react-redux"
import "../../css/Sidebar.css"
import sideBarButton from "./sideBarButton"
import Sidebar from "./sideBarList";
import SideBarButton from "./sideBarButton";
import TaskDataController from "../../modules/dataController/TaskDataController";

export default function SideBarElement(props) {
    console.log(props)
    let cssID;
    if (props.identifier !== 'toDo' && props.identifier !== 'completed'){
        cssID = "otherSectionssideBar";
    }
    else{
        cssID = props.identifier + "sideBar";
    }

    return(
        <div
            class="sideBarElement"
            id={cssID}>
            <SideBarButton
                identifier = {props.identifier}/>
            <input
                class="bar-title"
                id={cssID}
                // class="bar-title"
                type='text'
                alt='task text'
                // alt='Section text'
                onChange= { (e) => handleTextEvent(props.identifier,e)}
                value={props.text}/>
        </div>
    )
}

function handleTextEvent(id,event) {
    const text = event.currentTarget.value
    TaskDataController.updateSectionText(id,text)
}