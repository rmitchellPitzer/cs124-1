import "../../css/sidebar.css"
import SideBarButton from "./sideBarButton";
import TaskDataController from "../../modules/dataController/TaskDataController";
import SectionAddTaskButton from "../newSection/sectionAddTask";
import PrioritySortButton from "../newSection/priorityButton";



// Will create the Individual elements inside the sideBarlist.
// contains a sideBarButton, an input field for the section title, and a add task button for the section

export default function SideBarCompletedSection(props) {
    console.log("This is a sidebar!")
    console.log(props)
    // cssID determines whether the sidebar is todo, completed, or a added section.

    let cssID = "completedsideBar"




    return(
        <div
            class="sideBarElement"
            id={cssID}>
            <SideBarButton
                identifier = "completedSectionHeader"
                title = "Completed"/>
            <div
                aria-label="This is the Completed Section Text"
                class="bar-title"
                id="completedsideBar1"
                // class="bar-title"
                type='text'
                alt='task text'
                // alt='Section text'
                value="Completed">Completed</div>
        </div>
    )
}
