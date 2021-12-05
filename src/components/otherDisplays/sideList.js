import { connect } from "react-redux"
import TaskDataController from "../../modules/dataController/TaskDataController"
import SideListElement from "./sideListElement";
import React, { useEffect, useState } from 'react';



// Creates the scrollable list on the right side of the viewport made up of sideListElements
function SideList(props){

    return(
        <div class='SideListContainer' id="theSideListContainer">
            {
                props.sections.map(section => {
                    return <SideListElement
                        {...section}
                        key={section.identifier}
                    />
                })
            }
        </div>
    )
}


function mapStateToProps(state, ownProps){
    return{
        sections: TaskDataController.getSections()}
}

export default connect(mapStateToProps)(SideList)