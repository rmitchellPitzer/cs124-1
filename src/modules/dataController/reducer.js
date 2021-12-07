/* eslint-disable no-lone-blocks */
import { v4 as uuidv4 } from 'uuid';
import {
    CREATE_TASK,
    DELETE_ALL_COMPLETED_TASK,
    DELETE_TASK,
    HIDE_MENU,
    HIDE_UNDO,
    SHOW_MENU,
    SHOW_UNDO,
    TOGGLE_COMPLETED_LIST,
    TOGGLE_TASK_COMPLETION,
    TOGGLE_TODO_LIST,
    TOGGLE_UNDO,
    UNDO_TASK,
    UPDATE_TASK_TEXT,
    CREATE_SECTION,
    DELETE_SECTION,
    UPDATE_SECTION_TEXT,
    TOGGLE_SECTION,
    CLEAR_ALL,
    GET_TOGGLED,
    PUSH_COMPLETED_TASK,
    TOGGLE_COMPLETED_SECTION_BUTTON
} from './actions';

import {database} from "./firestore";
import {collectionName} from "./firestore";


// import firebase from "firebase/compat";
// import {useCollection} from "react-firebase-hooks/firestore";
//
// // lab 3 work:
//
// const firebaseConfig = {
//     apiKey: "AIzaSyD8bEScFINGaDttxHPcnMbjIPmW64m-4SI",
//     authDomain: "rmitchellpitzer-hmc-tasks.firebaseapp.com",
//     projectId: "rmitchellpitzer-hmc-tasks",
//     storageBucket: "rmitchellpitzer-hmc-tasks.appspot.com",
//     messagingSenderId: "670939286123",
//     appId: "1:670939286123:web:3dd28bb7e5badcce873f2e"
// };
//
// firebase.initializeApp(firebaseConfig);
// const db = firebase.firestore();


// const initialState = {
//     stack:[],
//     sections: [{text:"To Do", isToggled:false, identifier:"toDo", tasks: []}, {text:"Completed", isToggled:false, identifier:"completed", tasks:[]}],
//     showUndo: false,
//     showMenu: false
// }

const initialState = {
    stack:[],
    sectionsToggled: [],
    completedTasks: [],
    showUndo: false,
    showMenu: false,
    showCompletedTasks: false
}



// Gets the sectionID from the section it's called on, creates a new task containing that sectionID, then appends it
// to the section's tasks list in initialState.

function createTask(state, sectionIdentifier) {
    const identifier = uuidv4()
    const taskRef = database.collection(collectionName).doc(sectionIdentifier).collection('tasks').doc(identifier)

    taskRef.set({
        id: identifier,
        sectionIdentifier: sectionIdentifier,
        isCompleted: false,
        text: "",
        timeMade: new Date(),
        priority: 0
    })
    return{
        ...state
    }
}

// Deletes a task with the given id.

function deleteTask(state,id) {
    const tasks = state.tasks.filter(task => task.id !== id)
    return {
        ...state,
        tasks
    }
}






// Updates a task's text given it's id, section identifier, and text to update it to.
// identifier is needed to find which section the task will be located in.

function updateTaskText(state,{id, identifier,text}) {
    const taskRef = database.collection(collectionName).doc(identifier).collection('tasks').doc(id)
    taskRef.update({
        text: text
        }
    )
    return{
        ...state
    }
}

// oh boy this is a doozy.
// The reason why this function is so big is that it needs to account for when the task that's being checked is not
// present in the same section as it's section Identifier. While it might have a sectionIdentifier, it might be in
// the completed section, which means we can not locate the task with it's section identifier.

function toggleTaskCompletion(state,{id, identifier, isToggled}) {
    console.log(isToggled)
    const taskRef = database.collection(collectionName).doc(identifier).collection('tasks').doc(id)
    taskRef.update({
        isCompleted: (!isToggled)
    })
    console.log(isToggled)
    return{
        ...state
    }




    // const returnedSections = state.sections.map(x => x)
    // const sectionWithTask = returnedSections.find(section => section.identifier === identifier)
    // const taskToChange = sectionWithTask.tasks.find(task => task.id === id)
    // // create a copy of sections, find the section with the task and then get the task from the section.
    //
    // if (!taskToChange){
    //     // if it's null, the task is not present there, meaning it must be in completed, meaning it's being moved
    //     // from completed to another section and removed from completed, which happens here.
    //     const completedSection = returnedSections.find(section => section.identifier === "completed")
    //     const completedTask = completedSection.tasks.find(task => task.id === id)
    //     let taskIndex = completedSection.tasks.indexOf(completedTask)
    //     completedTask.isCompleted = !completedTask.isCompleted
    //     returnedSections.find(section => section.identifier === identifier).tasks.push(completedTask)
    //     returnedSections.find(section => section.identifier === "completed").tasks.splice(taskIndex, 1)
    // }
    // else{
    //     // here it's located the task, and is now moving it to the completed section and removing it from it's origin
    //     // section.
    //     let taskIndex = sectionWithTask.tasks.indexOf(taskToChange)
    //     taskToChange.isCompleted = !taskToChange.isCompleted
    //     returnedSections.find(section => section.identifier === "completed").tasks.push(taskToChange)
    //     returnedSections.find(section => section.identifier === identifier).tasks.splice(taskIndex, 1)
    // }
    //
    // return {
    //     ...state,
    //     sections:returnedSections
    // }

}

// deletes all tasks from the completed tasks section.
// stack.push is also here to implement an undo functionality, but this was very broken and eventually settled
// on not having it work.

function deleteAllCompletedTasks(state) {
    const stack = state.stack.map(x => x)
    stack.push(state.sections)
    const newSections = state.sections.map(x => x)
    newSections.find(section => section.identifier === "completed").tasks = []

   return {
       ...state,
       stack,
       sections:newSections
   }
}

// in the event of an undo button, the sections stored on the stack will be popped and returned to sections.

function undoTask(state) {
    const stack = state.stack.map(x => x)
    const newSections = stack.pop()
    return {
        ...state,
        sections: newSections,
        stack 
    }
}


function toggleCompletedList(state) {
    return {
        ...state,
        showCompleted: !state.showCompleted
    }
}

function toggleToDoList(state) {
    return {
        ...state,
        showTodo: !state.showTodo 
    }
}

function showMenu(state) {
    return {
        ...state,
        showMenu: true 
        }
}

function hideMenu(state) {
    return {
        ...state,
        showMenu:false 
    }
}

function showUndo(state) {
    return {
        ...state,
        showUndo: true
    }
}

function hideUndo(state) {
    return {
        ...state,
        showUndo: false 
    }
}


// function for creating a section, this will push a new empty section onto the state's sections.

function createSection(state) {
    // first part creates a new section in firestore, section part creates a section in redux to enable toggled states.
    const identifier = uuidv4()
    const sectionRef = database.collection(collectionName).doc(identifier)
    sectionRef.set({
        identifier: identifier,
        title: "",
    })

    const newToggledSections = state.sectionsToggled.map(x => x)
    newToggledSections.push(identifier)

    return{
        ...state,
        sectionsToggled: newToggledSections
    }


    // by default, istoggled true by default.
    // Don't want to have users add tasks, and then it's not visible.
    // decided to scrap code for redux: Figured that if a user changes something on
    // a device, it should also be visible on another device, which would require
    // tracking isToggled in firestore.

    // const returnedSectionsToggle = state.sectionsToggled.map(x => x)
    // returnedSectionsToggle.push({
    //     identifier: identifier,
    //     isToggled: true
    // })
    // return {
    //     ... state,
    //     sectionsToggled: returnedSectionsToggle
    //
    // }
}



// finds a section via it's sectionIdentifier and uses filter to remove it.

function deleteSection(state, sectionIdentifier) {
    const sections = state.sections.filter(sections => sections.identifier !== sectionIdentifier)
    return {
        ...state,
        sections
    }
}


// Similar to updating a task's text, updates a section's text with help from it's sectionIdentifier.

function updateSectionText(state,{sectionIdentifier,text}){
    const sectionToUpdate = database.collection(collectionName).doc(sectionIdentifier);
    sectionToUpdate.update({
        title: text

    })
    return{
        ...state
    }
}

// This will toggle whether the section's button is pressed or not, and will show the tasklist or hide it
// depending on whether it's toggled or not.

function toggleSection(state, sectionIdentifier) {


    const newToggledSections = state.sectionsToggled.map(x => x)
    if(newToggledSections.includes(sectionIdentifier)){
        let taskIndex = newToggledSections.indexOf(sectionIdentifier)
        newToggledSections.splice(taskIndex, 1)



    }
    else{
        newToggledSections.push(sectionIdentifier)
    }

    return {
        ...state,
        sectionsToggled: newToggledSections
    }
}

// Clears all tasks and sections, and resets them to the default value when loading the page. It also pushes
// the sections onto the stack because undo functionality works with this but doesn't work with the other one,
// and I have no idea why.

function clearAll(state){

    const stack = state.stack.map(x => x)
    stack.push(state.sections)
    const newSections = [{text:"To Do", isToggled:false, identifier:"toDo", tasks: []}, {text:"Completed", isToggled:false, identifier:"completed", tasks:[]}]
    return{
        ...state,
        stack,
        sections:newSections
    }
}

function getToggledStatus(state, sectionIdentifier){
    const newSections = state.sections.map(x => x)
    const sectionWithId = newSections.find(section => section.identifier === sectionIdentifier)
    if (!sectionWithId){
        return null
    }
    return sectionWithId.isToggled
}

function pushCompletedTask(state, contents){
    console.log("This should be the completed tasks in the state")
    console.log(contents.Task)
    return{
        ...state,
        completedTasks: contents.Task
    }
    // const currentTask = task.Task
    // const currentCompletedTasks = state.completedTasks.map(x => x)
    //
    // if (currentCompletedTasks.length === 0){
    //     if (currentTask.isCompleted){
    //
    //         currentCompletedTasks.push(currentTask)
    //
    //         return{
    //             ...state
    //         }
    //     }
    // }
    // else if (currentCompletedTasks.filter(completedTask => completedTask.id === currentTask.id).length > 0) {
    //     console.log("The Task was not in the list")
    //     if (currentTask.isCompleted){
    //         console.log("The Task is completed")
    //         currentCompletedTasks.push(currentTask)
    //         return{
    //             ...state,
    //             completedTasks: currentCompletedTasks
    //         }
    //     }
    // }
    // console.log("The Task was pushed out :/")
    // return{
    //     ...state
    // }
    //
    // // console.log("This is the task!")
    // // console.log(currentTask)
    // // if (currentTask.isCompleted){
    // //     console.log("Task is completed")
    // //     if (state.completedTasks.includes(currentTask)){
    // //         console.log("Task is in the currentTask")
    // //         return{
    // //             ...state
    // //         }
    // //     }
    // // else{
    // //         console.log("Task is not in currentTask, is completed")
    // //         const newSections = state.completedTasks
    // //         console.log(newSections)
    // //         newSections.push(currentTask)
    // //         console.log(newSections)
    // //         return{
    // //             ...state,
    // //             completedTasks: newSections
    // //         }
    // //     }
    // // }
    // // else{
    // //     console.log("Task is uncompleted.")
    // //     return{
    // //         ...state
    // //     }
    // // }
}

function toggleCompletedSection(state){
    const newToggledStatus = (!state.showCompletedTasks)
    return{
        ...state,
        showCompletedTasks: newToggledStatus
    }
}




export default function toDoReducer(state = initialState, action){
    switch (action.type){
        case CREATE_TASK: return createTask(state, action.payload.sectionIdentifier)
        case DELETE_TASK: return deleteTask(state,action.payload.id)
        case UPDATE_TASK_TEXT: return updateTaskText(state,action.payload)
        case TOGGLE_TASK_COMPLETION: return toggleTaskCompletion(state,action.payload)
        case DELETE_ALL_COMPLETED_TASK: return deleteAllCompletedTasks(state)
        case TOGGLE_TODO_LIST: return toggleToDoList(state)
        case TOGGLE_COMPLETED_LIST: return toggleCompletedList(state)
        case SHOW_MENU: return showMenu(state)
        case HIDE_MENU: return hideMenu(state)
        case UNDO_TASK: return undoTask(state)
        case SHOW_UNDO: return showUndo(state)
        case HIDE_UNDO: return hideUndo(state)
        case CREATE_SECTION: return createSection(state)
        case DELETE_SECTION: return deleteSection(state,action.payload.sectionIdentifier)
        case UPDATE_SECTION_TEXT: return updateSectionText(state, action.payload)
        case TOGGLE_SECTION: return toggleSection(state, action.payload.sectionIdentifier)
        case CLEAR_ALL: return clearAll(state)
        case GET_TOGGLED: return getToggledStatus(state, action.payload.sectionIdentifier)
        case PUSH_COMPLETED_TASK: return pushCompletedTask(state, action.payload)
        case TOGGLE_COMPLETED_SECTION_BUTTON: return toggleCompletedSection(state)
        default:
            return state 
    }


}