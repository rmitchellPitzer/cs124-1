import { faAngleRight } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import "../../css/sidebar.css"

import store from "../../modules/dataController/store";


// The components in otherDisplays are visible when the display is in landscape or in desktop view.



function SideBarButton(props) {
    // Sidebar button is treated similarly to SectionButton in newSection,  but does not rotate and will instead
    // scroll to the Section element in sideList

    const currentSectionText = store.getState().sections.find(section => section.identifier === props.identifier).text
    // another currentSectionText for aria-label!!!

    const icon = faAngleRight

    return (
        <div class="SideBarButton" onClick={(e) => handleOnClick(props.identifier)}
        aria-label={currentSectionText ? "Press to scroll to " + currentSectionText : "Press to scroll to a section without a title"}
        aria-hidden="false">
            <FontAwesomeIcon icon={icon} />
        </div>
    )
}




function handleOnClick(identifier) {
    // handles scrolling to the element, uses scrollIntoView to acomplish this.
    // this should work on all popular platforms minus internet explorer, and
    // safari won't support the options like smooth, block, and inline.

    let sectionToScrollTo = document.getElementById(identifier+"list");
    sectionToScrollTo.scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"})
}



export default SideBarButton