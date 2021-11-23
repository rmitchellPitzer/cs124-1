import SectionContainer from "./SectionContainer";
import TaskDataController from "../../modules/dataController/TaskDataController"
import { connect } from "react-redux"
import React, { useEffect, useState } from 'react';

/*
props:{
    sections: Section

 */

function SectionList(props){
    // Creates the container for displaying sections in a mobile display
    return(
        <div class='container'>
            {
                props.sections.map(section => {
                    return <SectionContainer
                        {...section}
                        key={section.identifier}
                    />
                })
            }
        </div>
    )
}

function mapStateToProps(state, ownProps){
    // Used to get the sections for sectionList
    return{
        sections: TaskDataController.getSections()}
}

export default connect(mapStateToProps)(SectionList)