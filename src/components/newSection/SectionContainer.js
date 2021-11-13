import { connect } from "react-redux"
import AppDataController from "../../modules/dataController/AppDataController.js"
import TaskDataController from "../../modules/dataController/TaskDataController.js"
import TaskList from "../Tasks/TaskList.js"
import SectionBar from "./SectionBar.js"

/*
@props: {
    className: "todo-bar| completed-bar";
    sectionTitle: string;
    tasks: TaskItem[]
    showContainer: boolean
}
*/


/*
new props:
    This will take in:
    - identifier: A random uuidv4, for To do it's 'toDo', for completed: 'completed'
    - text: A title, by default it's null, for to do and completed... yeah.
    - isToggled: false or true, will toggle viewing the tasks
    - tasks: The list of tasks assigned to each section.
 */

// export default function Section(props) {}



function SectionContainer(props) {
    return (
        <div>
            <SectionBar
                sectionTitle = {props.text}
                className={props.identifier}
                identifier ={props.identifier}
                />
            { props.isToggled && <TaskList tasks={props.tasks} />}
        </div>
    )
}



// function mapStateToProps(state,ownProps) {
//     const isToDo = ownProps.identifier === "toDo"
//     const isCompleted = ownProps.identifier === "completed"
//
//     if (isToDo) return {
//         tasks: TaskDataController.getTasks("todo"),
//         showContainer: AppDataController.showToDo()
//     }
//     else if (isCompleted) return {
//         tasks: TaskDataController.getTasks("completed"),
//         showContainer: AppDataController.showCompleted()
//     }
//
//     else return {
//         tasks: TaskDataController.getTasks(ownProps.identifier),
//         showContainer: AppDataController.showCompleted()
//     }
// }

// export default connect(mapStateToProps)(SectionContainer)
export default (SectionContainer)