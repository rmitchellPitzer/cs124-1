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
    TOGGLE_COMPLETED_SECTION_BUTTON,
    SET_SECTION_TO_STACK,
    SET_TASKS_TO_STACK,
    UPDATE_TASK_PRIORITY,
    PUSH_SELECTED_SECTION_ACTION, SHOW_PRIORITY_MENU, HIDE_PRIORITY_MENU, SET_SECTION_PRIORITY
} from './actions';

import {database} from "./firestore";
import {collectionName} from "./firestore";
import TaskDataController from "./TaskDataController";



// Initial state,
// sectionStack is used to keep track of sections
// taskStack is used for deleting tasks instead of querying
// sections toggled, keeps track of which sections in mobile view are
// currently being shown
// show undo, show menu, show... just show what their name is.
// selectedSection: will contain a section's identifier and name when
// the priority sort button is pressed, pushing it to the stack so it
// can be read by other components and altered.
const initialState = {
    sectionStack:[],
    taskStack: [],
    sectionsToggled: [],
    completedTasks: [],
    showUndo: false,
    showMenu: false,
    showPriorityMenu: false,
    showCompletedTasks: false,
    selectedSection: []
}



// creates a task using firestore
function createTask(state, sectionIdentifier) {
    const identifier = uuidv4()
    const taskRef = database.collection(collectionName).doc(sectionIdentifier).collection('tasks').doc(identifier)

    taskRef.set({
        id: identifier,
        sectionIdentifier: sectionIdentifier,
        isCompleted: false,
        text: "",
        timeMade: new Date(),
        priority: 2
    })
    return{
        ...state
    }
}

// Deletes a task with the given id, although I don't think this is used at all.
// Don't want to delete it yet out of fear of messing up the reducer
function deleteTask(state,id) {
    const tasks = state.tasks.filter(task => task.id !== id)
    return {
        ...state,
        tasks
    }
}






// Updates a task's text given it's id, section identifier, and text to update it to.
// uses firestore.
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


// Hey this is no longer 100 lines of code!
// Just gets the task being marked completed, sets it to the opposite of what it's completed status is.
function toggleTaskCompletion(state,{id, identifier, isToggled}) {
    const taskRef = database.collection(collectionName).doc(identifier).collection('tasks').doc(id)
    taskRef.update({
        isCompleted: (!isToggled)
    })
    return{
        ...state
    }
}

// deletes all tasks that are marked completed.
// updates firestore

function deleteAllCompletedTasks(state) {
    const completedTasks = state.completedTasks.map(x => x)
    for (const index in completedTasks){
        const taskToDelete = database.collection(collectionName).doc(completedTasks[index].sectionIdentifier).collection('tasks').doc(completedTasks[index].id);
        taskToDelete.delete()

    }
        return {
       ...state
   }
}

// it do not exist.
// We will no longer be afraid of commitment. What ever happened to
// pressing an action button, and meaning it, knowing there was no
// going back? Today, well tonight, well today it's 7 am I need to sleep,
// Today, we conquer our fears of commitment that have held us back,
// and proudly remove a requested feature from our app: The undo button.

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
    // first part creates a new section in firestore.
    const identifier = uuidv4()
    const sectionRef = database.collection(collectionName).doc(identifier)
    sectionRef.set({
        identifier: identifier,
        title: "",
        sortType: 7
    })


    return{
        ...state
    }
}



// it's unneccessary code again.
// pushing removing a lot of this to lab5 due to time constraints.
// I would rather have a working app than an app that doesn't work, but has cleaner
// code.

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
// Also pushes that identifier to the stack if it's toggled, or removes it from it if it isn't toggled.

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

// Clears all tasks and sections except one, which it will reset the text and tasks of.
// This is to avoid a weird thing where sections show up after a short delay.

function clearAll(state){
    const stackList = state.sectionStack
    const taskList = state.taskStack
    for (const index in taskList){
        const taskToDelete = database.collection(collectionName).doc(taskList[index].sectionIdentifier).collection('tasks').doc(taskList[index].id)
        taskToDelete.delete()
    }
    for (const index in stackList){
        if(index == (stackList.length - 1)){

            const sectionToModify = database.collection(collectionName).doc(stackList[index].identifier)
            sectionToModify.update({

                title: ""}
            )
        }
        else{
            const sectionToDelete = database.collection(collectionName).doc(stackList[index].identifier)
            sectionToDelete.delete()
        }
    }

    return{
        ...state,
        sectionsToggled: []
    }
}


// it do not matter.

function getToggledStatus(state, sectionIdentifier){
    const newSections = state.sections.map(x => x)
    const sectionWithId = newSections.find(section => section.identifier === sectionIdentifier)
    if (!sectionWithId){
        return null
    }
    return sectionWithId.isToggled
}

// Pushes a task to the state, this command will only be used if the task is marked completed.
function pushCompletedTask(state, contents){
    return{
        ...state,
        completedTasks: contents.Task
    }
}

// function to set the completed section's toggle status in mobile view.
function toggleCompletedSection(state){
    const newToggledStatus = (!state.showCompletedTasks)
    return{
        ...state,
        showCompletedTasks: newToggledStatus
    }
}

// function to update the stack with a list of sections.
function setSectionToStack(state, stackList){
    return{
        ...state,
        sectionStack: stackList
    }
}

//refer to line 327, but replace sections with tasks.
function setTasksToStack(state, taskList){
    return{
        ...state,
        taskStack: taskList
    }
}

// Updates the priority of a task.
// First part is telling if the priority status is at it's limit, and then setting it to the lowest value.
// Second part is updating the firestore db
function updateTaskPriority(state, {id, sectionIdentifier, value}){
    let newValue = 0
    if(value > 2){
        newValue = 1
    }
    else{
        newValue = value + 1
    }
    const TaskRef = database.collection(collectionName).doc(sectionIdentifier).collection('tasks').doc(id)
    TaskRef.update({
        priority: newValue
    })
    return{
        ...state
    }
}

// pushing the section whose tasks are being sorted to the stack to keep track of.
function pushSelectedSection(state, {sectionIdentifier, sortType}){
    return{
        ...state,
        selectedSection: {sectionIdentifier, sortType}
    }
}

// show priority menu, (state)
function showPriorityMenu(state){
    return {
        ...state,
        showPriorityMenu: true
    }
}

// same thing, except this resets the selected section as none are being shown.
function hidePriorityMenu(state){
    return {
        ...state,
        selectedSection: [],
        showPriorityMenu: false
    }
}
// Updates the selected Section's priority sort type. Also resets selected section.
function setSectionPriority(state, value){
    const sectionRef = database.collection(collectionName).doc(state.selectedSection.sectionIdentifier)
    sectionRef.update({
        sortType: value
    })
    return{
        ...state,
        selectedSection: [],
        showPriorityMenu: false
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
        case SET_SECTION_TO_STACK: return setSectionToStack(state, action.payload.stackList)
        case SET_TASKS_TO_STACK: return setTasksToStack(state, action.payload.taskList)
        case UPDATE_TASK_PRIORITY: return updateTaskPriority(state, action.payload)
        case PUSH_SELECTED_SECTION_ACTION: return pushSelectedSection(state, action.payload)
        case SHOW_PRIORITY_MENU: return showPriorityMenu(state)
        case HIDE_PRIORITY_MENU: return hidePriorityMenu(state)
        case SET_SECTION_PRIORITY: return setSectionPriority(state, action.payload.value)
        default:
            return state 
    }


}