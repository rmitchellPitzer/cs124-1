import { connect } from "react-redux"
import TaskDataController from "../../modules/dataController/TaskDataController"
import SideListElement from "./sideListElement";
import React, { useEffect, useState } from 'react';
import SideListCompletedSection from "./sideListCompletedSection";



// Creates the scrollable list on the right side of the viewport made up of sideListElements
// includes the completed special section as well
function SideList(props) {
    console.log("These are the elements for sidelist")
    console.log(props)
    if (props.sections) {
        return (
            <div class='SideListContainer' id="theSideListContainer">
                {
                    props.sections.map(section => {
                        return <SideListElement
                            {...section}
                            key={section.identifier}
                        />
                    })
                }
                <SideListCompletedSection/>
            </div>
        )
    }
    else{
        return null
    }
}


export default SideList