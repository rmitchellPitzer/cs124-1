import store from "../../modules/dataController/store";
import {connect} from "react-redux";
import "../../css/bar.css"
import SectionButton from "./SectionButton";
import SectionAddTaskButton from "./sectionAddTask";
import TaskDataController from "../../modules/dataController/TaskDataController";
import AppDataController from "../../modules/dataController/AppDataController";
import CompletedSectionButton from "./completedSectionButton";



function CompletedSection(props) {
    let cssID = "completed";
    return (
        <div class={"barCompleted"} id={"bar" + cssID}>
            <CompletedSectionButton text = {props.sectionTitle}/>
            <div
                aria-label={props.sectionTitle ? "Edit the section title of" + props.sectionTitle : "Edit the title of an empty section"}
                class="bar-title"
                id={cssID}
                type='text'
                alt='Completed text'
                value="Completed"
            >Completed</div>
        </div>)
}

// function mapToState(state, ownProps) {
//     console.log("Getting all the completedTasks")
//     console.log(store.getState().completedTasks)
//     return {
//         completedTasks: store.getState().completedTasks
//     }
// }
//
// export default connect(mapToState)(CompletedSection)

export default CompletedSection