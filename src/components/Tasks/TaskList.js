import Task from "./Task";





/*
props:{
    tasks: TaskItem[]

}
*/

// creates the list of tasks within each section visible in mobile view.

export default function TaskList(props) {
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