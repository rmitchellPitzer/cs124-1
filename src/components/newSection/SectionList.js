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
    console.log("And here's the completed Tasks")
    console.log(props.completedTasks)
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
            { props.isToggled &&
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
    console.log("Here's the tasks being passed in!")
    console.log(store.getState().completedTasks)
    return{
        isToggled: store.getState().showCompletedTasks,
        completedTasks: store.getState().completedTasks}
}

export default connect(mapStateToProps)(SectionList)