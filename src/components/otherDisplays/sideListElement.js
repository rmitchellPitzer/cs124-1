import TaskDataController from "../../modules/dataController/TaskDataController";
import "../../css/sideList.css"
import SideListElementTask from "./sideListElementTask";



// creates the element inside of sidelist, these will contain a section title, a task's checkbox, and a sidelistelement
// task, which is basically a task but in desktop view.

export default function SideListElement(props) {

    return(
        <div
            class="SideListElement"
            aria-label={props.text ? "this is the section for " + props.text : "this is a section without a title."}
            id = {props.identifier+"list"}>
            <input
                aria-label={props.text ? "Edit the title for section " + props.text : "edit the title for a section without a title."}
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
