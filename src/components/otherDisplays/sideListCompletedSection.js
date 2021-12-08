import TaskDataController from "../../modules/dataController/TaskDataController";
import "../../css/sideList.css"
import SideListElementTask from "./sideListElementTask";
import {collectionName, database} from "../../modules/dataController/firestore";
import {useCollection} from "react-firebase-hooks/firestore";
import store from "../../modules/dataController/store";
import CompletedSectionTask from "../newSection/completedSectionTask";
import {connect} from "react-redux";
import SideListCompletedSectionTask from "./sideListCompletedSectionTask";



// creates the element inside of sidelist, these will contain a section title, a task's checkbox, and a sidelistelement
// task, which is basically a task but in desktop view.

function SideListCompletedSection(props) {

        return (
            <div
                class="SideListElement"
                aria-label="This is a Completed Section Header"
                id = "completedSectionHeaderlist">
                <div
                    aria-label="This is the completed Section Header"
                    className="sideListTitle"
                    // class="bar-title"
                    type='text'
                    alt='task text'
                    // alt='Section text'
                    value="Completed"
                >Completed</div>
                <div>{
                props.completedTasks.map(task => {
                    return <SideListCompletedSectionTask
                        {...task}
                        key={task.id}
                    />
                })}
                </div>
            </div>
        )
    // else{
    //     return null
    // }
}
// return (
//     <div> Completed
//         <SideListCompletedSectionTask
//             isCompleted={props.completedTasks[0].isCompleted}
//             sectionIdentifier={props.completedTasks[0].sectionIdentifier}
//             id={props.completedTasks[0].id}
//             priority={props.completedTasks[0].priority}
//             text={props.completedTasks[0].text}
//             timeMade={props.completedTasks[0].timeMade}
//
//         />
//     </div>
// )



// function SideListCompletedSection(props) {
//     console.log(props.completedTasks)
//     console.log("Completed tasks above!")
//     return(
//         <div
//             class="SideListElement"
//             aria-label="This is the completed section"
//             id = "completedlist">
//             <input
//                 aria-label={props.title ? "Edit the title for section " + props.title : "edit the title for a section without a title."}
//                 className="sideListTitle"
//                 // class="bar-title"
//                 type='text'
//                 alt='Completed text'
//                 // alt='Section text'
//                 value="Completed"
//             />
//             {/*<div class='sideListTask'>{*/}
//             <div>{
//                 props.completedTasks.map(task => {
//                     return <SideListCompletedSectionTask
//                         {...task}
//                         key={task.id}
//                     />
//                 })
//             }
//
//             </div>
//         </div>
//     )
// }








function mapStateToProps(state){
    return{
        completedTasks: store.getState().completedTasks}
}

export default connect(mapStateToProps)(SideListCompletedSection)
