import SectionContainer from "./SectionContainer";
import TaskDataController from "../../modules/dataController/TaskDataController"
import { connect } from "react-redux"
import React, { useEffect, useState } from 'react';
import {collectionName, database} from "../../modules/dataController/firestore";
import {useCollection} from "react-firebase-hooks/firestore";
import CompletedSection from "./completedSection";
import TaskList from "../Tasks/TaskList";
import store from "../../modules/dataController/store";
import CompletedSectionsTaskList from "./completedSectionsTaskList";

/*
props:{
    sections: Section

 */

function SectionList(props){
    if (props.sections){
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