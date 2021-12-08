import TaskList from "../Tasks/TaskList.js"
import SectionBar from "./SectionBar.js"
import AppDataController from "../../modules/dataController/AppDataController";
import {connect} from "react-redux";
import TaskDataController from "../../modules/dataController/TaskDataController";
import {collectionName, database} from "../../modules/dataController/firestore";
import {useCollection} from "react-firebase-hooks/firestore";
import store from "../../modules/dataController/store";
import CompletedSection from "./completedSection";



/*
props:
    This will take in:
    - identifier: A random uuidv4 for added sections, for To do it's 'toDo', for completed: 'completed'
    - text: A title, by default it's null, for to do and completed... yeah.
    - isToggled: false or true, will toggle viewing the tasks
    - tasks: The list of tasks assigned to each section.
 */



// I am truly embarassed and deeply concerned for what this is.
// The long list of code below sorts the tasks by whatever sortType
// is selected. This needs to be done before the tasks are put into
// the taskList, so below is a long list of all that.
// Not only that, tasks as well as completed tasks are pushed to the state.
// This is done so that in clearing all sections and tasks, instead of making
// many queries, we already have all tasks and sections we need to clear in
// the state.
// And then, once that's done, this will return a given section
function SectionContainer(props) {
    const isToggled = (props.isToggledList.includes(props.identifier))

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


    return (
        <div>
            {fireStoreList && <SectionBar
                sectionTitle = {props.title}
                className={props.identifier}
                identifier ={props.identifier}
                sortType = {props.sortType}
                isToggled ={isToggled}
                />}
            { isToggled && fireStoreList &&
                <TaskList tasks={fireStoreList}/>}

        </div>
    )
}

function mapToState(state, ownProps) {
     return {
         isToggledList: store.getState().sectionsToggled,
     }
 }

export default connect(mapToState)(SectionContainer)


