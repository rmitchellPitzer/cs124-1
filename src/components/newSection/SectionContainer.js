import TaskList from "../Tasks/TaskList.js"
import SectionBar from "./SectionBar.js"
import AppDataController from "../../modules/dataController/AppDataController";
import {connect} from "react-redux";
import TaskDataController from "../../modules/dataController/TaskDataController";



/*
props:
    This will take in:
    - identifier: A random uuidv4 for added sections, for To do it's 'toDo', for completed: 'completed'
    - text: A title, by default it's null, for to do and completed... yeah.
    - isToggled: false or true, will toggle viewing the tasks
    - tasks: The list of tasks assigned to each section.
 */




function SectionContainer(props) {

    return (
        <div>
            <SectionBar
                sectionTitle = {props.title}
                className={props.identifier}
                identifier ={props.identifier}
                isToggled ={false}
                />
            { props.isToggled &&
                <TaskList tasks={props.tasks}
                    identifier={props.identifier}/>}

        </div>
    )
}

function mapToState(state, ownProps) {
    console.log("Calling get toggled status")
    return {
        isToggled: TaskDataController.getToggledStatus(ownProps.identifier)
    }
}

export default connect(mapToState)(SectionContainer)

