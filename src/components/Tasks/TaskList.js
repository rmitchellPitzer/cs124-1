import Task from "./Task";





/*
props:{
    tasks: TaskItem[]

}
*/
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