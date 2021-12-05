import Task from "./Task";
import CompletedSection from "../newSection/completedSection";





/*
props:{
    tasks: TaskItem[]

}
*/

// creates the list of tasks within each section visible in mobile view.

export default function TaskList(props) {
    console.log("This is the TaskList")
    console.log(props)
    return (
        <div class='container'>
            {
            props.tasks.map(task => {
            return <Task 
                        {...task}
                        key={task.id}
                    />
            })
            }
        </div>   
    )
    
}