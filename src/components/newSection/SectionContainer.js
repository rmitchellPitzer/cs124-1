import TaskList from "../Tasks/TaskList.js"
import SectionBar from "./SectionBar.js"


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
                sectionTitle = {props.text}
                className={props.identifier}
                identifier ={props.identifier}
                isToggled = {props.isToggled}
                />
            { props.isToggled &&
                <TaskList tasks={props.tasks}
                    identifier={props.identifier}/>}

        </div>
    )
}



export default (SectionContainer)