import "../../css/Sidebar.css"
import SideBarButton from "./sideBarButton";
import TaskDataController from "../../modules/dataController/TaskDataController";
import SectionAddTaskButton from "../newSection/sectionAddTask";



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

    const checkIfTypeIsCompleted = props.identifier !== "completed"




    return(
        <div
            class="sideBarElement"
            id={cssID}>
            <SideBarButton
                identifier = {props.identifier}/>
            <input
                aria-label={props.text ? "edit the title for the section " + props.text : "edit the title for a section with an empty title"}
                class="bar-title"
                id={cssID}
                // class="bar-title"
                type='text'
                alt='task text'
                // alt='Section text'
                onChange= { (e) => handleTextEvent(props.identifier,e)}
                value={props.text}/>
            {checkIfTypeIsCompleted && <SectionAddTaskButton
                identifier = {props.identifier}/>}

        </div>
    )
}

function handleTextEvent(id,event) {
    const text = event.currentTarget.value
    TaskDataController.updateSectionText(id,text)
}