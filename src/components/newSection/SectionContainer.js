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

// export default function Section(props) {}



function SectionContainer(props) {
    return (
        <div>
            <SectionBar sectionTitle = {props.sectionTitle} className={props.className} identifier ={props.identifier}/>
            { props.showContainer && <TaskList tasks={props.tasks} />}
        </div>
    )
}



function mapStateToProps(state,ownProps) {
    const isToDo = ownProps.sectionTitle === "To Do"
    const isCompleted = ownProps.sectionTitle === "Completed"

    if (isToDo) return { 
        tasks: TaskDataController.todo(),
        showContainer: AppDataController.showToDo()
    }
    else if (isCompleted) return {
        tasks: TaskDataController.completed(),
        showContainer: AppDataController.showCompleted()
    }

    else return {
        tasks: TaskDataController.completed(),
        showContainer: AppDataController.showCompleted()
    }
}

export default connect(mapStateToProps)(SectionContainer)