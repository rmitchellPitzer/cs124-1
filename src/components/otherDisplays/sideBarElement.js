import "../../css/sidebar.css"
import SideBarButton from "./sideBarButton";
import TaskDataController from "../../modules/dataController/TaskDataController";
import SectionAddTaskButton from "../newSection/sectionAddTask";
import PrioritySortButton from "../newSection/priorityButton";



// Will create the Individual elements inside the sideBarlist.
// contains a sideBarButton, an input field for the section title, and a add task button for the section

export default function SideBarElement(props) {

    // cssID determines whether the sidebar is todo, completed, or a added section.

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
                identifier = {props.identifier}
                title = {props.title}/>
            <input
                aria-label={props.title ? "edit the title for the section " + props.title : "edit the title for a section with an empty title"}
                class="bar-title"
                id={cssID}
                // class="bar-title"
                type='text'
                alt='task text'
                // alt='Section text'
                onChange= { (e) => handleTextEvent(props.identifier,e)}
                value={props.title}/>
            <PrioritySortButton
                identifier = {props.identifier}
                sectionTitle = {props.title}
                sortType = {props.sortType}/>
            <SectionAddTaskButton
                identifier = {props.identifier}/>


        </div>
    )
}

function handleTextEvent(id,event) {
    const text = event.currentTarget.value
    TaskDataController.updateSectionText(id,text)
}