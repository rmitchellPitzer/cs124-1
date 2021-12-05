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
    console.log("Hello section containers!")

    console.log(props.isToggledList)
    console.log(props.identifier)
    const isToggled = (props.isToggledList.includes(props.identifier))



    const taskRef = database.collection(collectionName).doc(props.identifier).collection('tasks')
    const [value, loading, error] = useCollection(taskRef);
    let fireStoreList = null;
    if (value) {
        fireStoreList = value.docs.map((doc) => {
            return {...doc.data()}});

        // fireStoreList.forEach(task => task.isCompleted ? TaskDataController.pushCompletedTask(task) : console.log(task))
    }
    if (value){
        fireStoreList.forEach(task => TaskDataController.pushCompletedTask(task))
    }
    console.log("Here's the firestore list")
    console.log(fireStoreList)



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
     console.log("Calling get toggled status")
    console.log(store.getState().sectionsToggled)
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

