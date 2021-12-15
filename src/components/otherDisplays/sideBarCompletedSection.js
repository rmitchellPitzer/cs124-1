import "../../css/sidebar.css"
import SideBarButton from "./sideBarButton";


// Will create the completed section inside the sidebar on the left.
// contains a sideBarButton.

export default function SideBarCompletedSection(props) {
    // cssID given to properly identify the section

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
