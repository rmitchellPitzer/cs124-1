import TaskDataController from "../../modules/dataController/TaskDataController";
import {connect} from "react-redux";
import "../../css/sideList.css"
import SideListElementTask from "./sideListElementTask";
export default function SideListElement(props) {
    // let cssID;
    // if (props.identifier !== 'toDo' && props.identifier !== 'completed'){
    //     cssID = "otherSections";
    // }
    // else{
    //     cssID = props.identifier;
    // }
    console.log(props)
    return(
        <div
            class="SideListElement"
            id = {props.identifier+"list"}>
            <input
                className="sideListTitle"
                // class="bar-title"
                type='text'
                alt='task text'
                // alt='Section text'
                onChange={(e) => handleTextEvent(props.identifier, e)}
                value={props.text}
            />
            <div class='sideListTask'>{
                props.tasks.map(task => {
                    return <SideListElementTask
                        {...task}
                        key={task.id}
                    />
                })
            }

            </div>
        </div>
    )
}

function handleTextEvent(id,event) {
    const text = event.currentTarget.value
    TaskDataController.updateSectionText(id,text)
}
