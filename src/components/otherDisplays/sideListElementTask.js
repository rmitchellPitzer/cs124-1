import TaskDataController from "../../modules/dataController/TaskDataController"
import "../../css/sideList.css"

/*
props: {
    text:string;
    isCompleted:boolean
    id:string
}
*/
export default function SideListElementTask(props) {
    const cssID = props.isCompleted ? 'completedTask' : ''
    return (
        <div class="SideListElementTask">
            <input
                alt='task completion status'
                class='sideListCheckbox'
                type="checkbox"
                value={ props.isCompleted}
                onChange= {(e) => handleCheckBoxEvent(props.id, props.sectionID)}
                checked= {props.isCompleted}
            />
            <input
                class='SideListElementTaskText'
                type='text'
                alt='task text'
                id ={cssID}
                onChange= { (e) => handleTextEvent(props.id, props.sectionID,e)}
                value={props.text}
            />
        </div>
    )

}

function handleTextEvent(id, identifier, event) {
    const text = event.currentTarget.value
    TaskDataController.updateTaskText(id, identifier, text)
}

function handleCheckBoxEvent(id, identifier) {
    TaskDataController.toggleTaskCompletion(id, identifier)
}