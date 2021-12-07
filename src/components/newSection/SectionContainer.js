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
        const fireStoreCompletedList = fireStoreList.map(x => x).filter(task => task.isCompleted === true)
        console.log("These should be the section's completed tasks")
        console.log(fireStoreCompletedList)
        stateCompletedList = store.getState().completedTasks.map(x => x).filter(task => task.sectionIdentifier !== props.identifier).concat(fireStoreCompletedList)
        console.log('This should be the states completed task list')
        console.log(stateCompletedList)
        console.log("These should be all completed tasks!")
        console.log(stateCompletedList)
        TaskDataController.pushCompletedTask(stateCompletedList)
    }


        // kill me.

        // let completedTaskList = [];
        // for (let index = 0; index < fireStoreList.length; index++) {
        //     console.log("Here's all the section tasks")
        //     console.log(fireStoreList[index])
        //     if (fireStoreList[index].isCompleted) {
        //         completedTaskList.push(fireStoreList[index])}}
        // let stateTasks = store.getState().completedTasks
        //
        // for (let Taskindex = 0; Taskindex < completedTaskList.length; Taskindex++) {
        //     console.log(stateTasks)
        //     if (stateTasks.length === 0){
        //         console.log("Pushed 1")
        //         console.log(completedTaskList[Taskindex])
        //         TaskDataController.pushCompletedTask(completedTaskList[Taskindex])
        //     }
        //     else{
        //         console.log("pushed 2")
        //         for (let stateIndex = 0; stateIndex < stateTasks.length; stateIndex++) {
        //             console.log("Pushed 3")
        //             if (!(stateTasks[stateIndex].id === completedTaskList[Taskindex].id)){
        //                 console.log("Pushed 4")
        //                 TaskDataController.pushCompletedTask(completedTaskList[Taskindex])
        //             }
        //         }
        //     }
        //
        //
        //         console.log("Here's all the completed tasks")
        //
        //         console.log(stateTasks)



                // for (let stateIndex = 0; stateIndex < stateTasks.length; stateIndex++) {
                //     if (!(stateTasks[stateIndex].id === fireStoreList[index].id)) {
                //         TaskDataController.pushCompletedTask(fireStoreList[index])
                //     }
                // }
                // if(!store.getState().completedTasks.includes(fireStoreList[index])){
                //     console.log((!store.getState().completedTasks.includes(fireStoreList[index])))
                //     console.log("This is the state.")
                //     console.log(store.getState().completedTasks)
                //     console.log("This is the task.")
                //     console.log(fireStoreList[index])
                //     TaskDataController.pushCompletedTask(fireStoreList[index])


    //
    //
    // console.log("Here's the completed tasks!")
    // console.log(store.getState().completedTasks)




    return (
        <div>
            {fireStoreList && <SectionBar
                sectionTitle = {props.title}
                className={props.identifier}
                identifier ={props.identifier}
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
//
export default connect(mapToState)(SectionContainer)

// const getPromise = taskRef.get()
// const snapshot = await getPromise;
// console.log(snapshot)


// console.log(props)
// const sectionRef = database.collection(collectionName)
// const [value, loading, error] = useCollection(sectionRef);
// console.log(sectionRef.onSnapshot())
//
// console.log(loading)
// console.log(error)
//
// console.log("Hello gamers,")
// console.log(value)
// let fireStoreTaskList = null;
// if (value) {
//     fireStoreTaskList = sectionRef.docs.map((doc) => {
//         return {...doc.data()}});
// }
// console.log("Figuring stuff out ")
// console.log(fireStoreTaskList)
//
//
//
// const queryTasks = database.collection(collectionName).doc(props.identifier).collection('tasks');
// const [value, loading, error] = useCollection(queryTasks);
//
// console.log(value)
//
//
// let fireStoreTaskList = null;
// if (value) {
//     fireStoreTaskList = value.docs.map((doc) => {
//         return {...doc.data()}});
// }
//
//
// console.log(fireStoreTaskList)
// console.log("Trying to see somethign")








// export default SectionContainer

