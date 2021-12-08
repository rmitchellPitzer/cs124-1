import TaskDataController from "../../modules/dataController/TaskDataController";
import "../../css/sideList.css"
import SideListElementTask from "./sideListElementTask";
import {collectionName, database} from "../../modules/dataController/firestore";
import {useCollection} from "react-firebase-hooks/firestore";
import store from "../../modules/dataController/store";



// creates the element inside of sidelist, these will contain a section title, a task's checkbox, and a sidelistelement
// task, which is basically a task but in desktop view.

export default function SideListElement(props) {

    const taskRef = database.collection(collectionName).doc(props.identifier).collection('tasks')
    const [value, loading, error] = useCollection(taskRef);
    let fireStoreList = null;
    let fireStoreCompletedList = null;
    let stateCompletedList = null;

    if (value) {
        fireStoreList = value.docs.map((doc) => {
            return {...doc.data()}
        });

        const allTasks = store.getState().taskStack.map(x => x).filter(task => task.sectionIdentifier !== props.identifier).concat(fireStoreList)
        TaskDataController.setTasksToStack(allTasks)

        const fireStoreCompletedList = fireStoreList.map(x => x).filter(task => task.isCompleted === true)
        stateCompletedList = store.getState().completedTasks.map(x => x).filter(task => task.sectionIdentifier !== props.identifier).concat(fireStoreCompletedList)
        TaskDataController.pushCompletedTask(stateCompletedList)

        if(props.sortType < 7){
            if(props.sortType === 1){
                fireStoreList.sort(function(task1, task2) {
                    let task1Text = task1.text.toUpperCase();
                    let task2Text = task2.text.toUpperCase();
                    return (task1Text < task2Text) ? -1 : (task1Text > task2Text) ? 1 : 0;
                });
            }
            else if(props.sortType === 2){
                fireStoreList.sort(function(task1, task2) {
                    let task1Text = task1.text.toUpperCase();
                    let task2Text = task2.text.toUpperCase();
                    return (task1Text > task2Text) ? -1 : (task1Text > task2Text) ? 1 : 0;
                });
            }
            else if(props.sortType === 3) {
                fireStoreList.sort(function(task1, task2) {
                    let task1date = task1.timeMade;
                    let task2date = task2.timeMade;
                    return (task1date < task2date) ? -1 : (task1date > task2date) ? 1 : 0;
                });
            }
            else if(props.sortType === 4){
                fireStoreList.sort(function(task1, task2) {
                    let task1date = task1.timeMade;
                    let task2date = task2.timeMade;
                    return (task1date > task2date) ? -1 : (task1date > task2date) ? 1 : 0;
                });
            }
            else if(props.sortType === 5){
                fireStoreList.sort(function(task1, task2) {
                    let task1priority = task1.priority;
                    let task2priority = task2.priority;
                    return (task1priority > task2priority) ? -1 : (task1priority > task2priority) ? 1 : 0;
                });
            }
            else if(props.sortType === 6){
                fireStoreList.sort(function(task1, task2) {
                    let task1priority = task1.priority;
                    let task2priority = task2.priority;
                    return (task1priority < task2priority) ? -1 : (task1priority > task2priority) ? 1 : 0;
                });
            }
        }



    }

    console.log(fireStoreList)


    return(
        <div>
            {fireStoreList &&
        <div
            class="SideListElement"
            aria-label={props.title ? "this is the section for " + props.title : "this is a section without a title."}
            id = {props.identifier+"list"}>
            <input
                aria-label={props.title ? "Edit the title for section " + props.title : "edit the title for a section without a title."}
                className="sideListTitle"
                // class="bar-title"
                type='text'
                alt='task text'
                // alt='Section text'
                onChange={(e) => handleTextEvent(props.identifier, e)}
                value={props.title}
            />
            <div class='sideListTask'>{
                fireStoreList.map(task => {
                    return <SideListElementTask
                        {...task}
                        key={task.id}
                    />
                })
            }

            </div>
        </div>}
        </div>
    )
}

function handleTextEvent(id,event) {
    const text = event.currentTarget.value
    TaskDataController.updateSectionText(id,text)
}
