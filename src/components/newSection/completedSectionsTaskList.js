import CompletedSectionTask from "./completedSectionTask";





/*
props:{
    tasks: TaskItem[]

}
*/

// creates the list of completed Tasks for the completed tasks list

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
