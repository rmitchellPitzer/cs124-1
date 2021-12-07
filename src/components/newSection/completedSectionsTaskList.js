import CompletedSection from "../newSection/completedSection";
import CompletedSectionTask from "./completedSectionTask";





/*
props:{
    tasks: TaskItem[]

}
*/

// creates the list of tasks within each section visible in mobile view.

export default function CompletedSectionsTaskList(props) {

    return (
        <div class='container'>
            {
                props.tasks.map(task => {
                    return <CompletedSectionTask
                        {...task}
                        key={task.id}
                    />
                })
            }
        </div>
    )}
