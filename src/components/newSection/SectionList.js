import SectionContainer from "./SectionContainer";
import { connect } from "react-redux"
import React, { useEffect, useState } from 'react';
import CompletedSection from "./completedSection";
import store from "../../modules/dataController/store";
import CompletedSectionsTaskList from "./completedSectionsTaskList";

/*
props:{
    sections: Section

 */
// Returns a list of sections
function SectionList(props){
    if (props.sections){
        return(
            <div class='sectionsContainer'>
                {
                    props.sections.map(section => {
                        return <SectionContainer
                            {...section}
                            key={section.identifier}
                        />
                    })
                }
            <CompletedSection/>
            { props.isCompletedTasksToggled &&
            <CompletedSectionsTaskList tasks={props.completedTasks}/>}
            </div>
        )
    }
    else{
        return null
    }
}

// export default SectionList


function mapStateToProps(state){
    return{
        isCompletedTasksToggled: store.getState().showCompletedTasks,
        completedTasks: store.getState().completedTasks}
}

export default connect(mapStateToProps)(SectionList)