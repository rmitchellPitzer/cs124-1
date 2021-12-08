import TaskDataController from "../../modules/dataController/TaskDataController";
import "../../css/sideList.css"
import SideListElementTask from "./sideListElementTask";
import {collectionName, database} from "../../modules/dataController/firestore";
import {useCollection} from "react-firebase-hooks/firestore";
import store from "../../modules/dataController/store";
import CompletedSectionTask from "../newSection/completedSectionTask";
import {connect} from "react-redux";
import sideListCompletedSectionTask from "./sideListCompletedSectionTask";



// creates the element inside of sidelist, these will contain a section title, a task's checkbox, and a sidelistelement
// task, which is basically a task but in desktop view.

function SideListCompletedSection(props) {
    console.log(props.completedTasks)
    console.log("Completed tasks above!")
    return(
            <div
                class="SideListElement"
                aria-label="This is the completed section"
                id = "completedlist">
                <div
                    aria-label={props.title ? "Edit the title for section " + props.title : "edit the title for a section without a title."}
                    className="sideListTitle"
                    // class="bar-title"
                    type='text'
                    alt='Completed text'
                    // alt='Section text'
                    value="Completed"
                >Completed</div>
                <div class='sideListTask'>{
                    props.completedTasks.map(task => {
                        console.log(task)
                        return <sideListCompletedSectionTask
                            {...task}
                            key={task.id}
                        />
                    })
                }

                </div>
            </div>
    )
}

function mapStateToProps(state){
    return{
        completedTasks: store.getState().completedTasks}
}

export default connect(mapStateToProps)(SideListCompletedSection)
