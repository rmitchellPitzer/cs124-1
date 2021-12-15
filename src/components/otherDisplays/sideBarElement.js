import "../../css/sidebar.css"
import SideBarButton from "./sideBarButton";
import TaskDataController from "../../modules/dataController/TaskDataController";
import SectionAddTaskButton from "../newSection/sectionAddTask";
import PrioritySortButton from "../newSection/priorityButton";
import store from "../../modules/dataController/store";
import ShareSectionButton from "../newSection/shareSectionButton";
import RemoveSectionSharedButton from "../newSection/removeSharedButton";

// Will create the Individual elements inside the sideBarlist.
// contains a sideBarButton, an input field for the section title, a share or remove section button,
// a sort button, and a add task button for the section

export default function SideBarElement(props) {
    // cssID determines whether the sidebar is shared or owned by the user.

    let cssID
    let classes = "sideBarElement"
    if (props.identifier !== 'toDo' && props.identifier !== 'completed'){
        cssID = "otherSectionssideBar";
    }




    const isOwned  = props.owner === store.getState().userID

    if(!isOwned){
        cssID = 'sideBarElementSHARED'
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
                class="side-bar-title"
                id={cssID}
                // class="bar-title"
                type='text'
                alt='task text'
                // alt='Section text'
                onChange= { (e) => handleTextEvent(props.identifier,e)}
                value={props.title}/>
            <div className="sideBarButtons">
            {isOwned && <ShareSectionButton
                sharedWith = {props.sharedWith}
                identifier = {props.identifier}/>}
            {!isOwned && <RemoveSectionSharedButton
                sharedWith = {props.sharedWith}
                identifier = {props.identifier}/>}

            <PrioritySortButton
                identifier = {props.identifier}
                sectionTitle = {props.title}
                sortType = {props.sortType}/>
            <SectionAddTaskButton
                identifier = {props.identifier}/>
            </div>

        </div>
    )
}

function handleTextEvent(id,event) {
    const text = event.currentTarget.value
    TaskDataController.updateSectionText(id,text)
}