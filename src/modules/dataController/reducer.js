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
    PUSH_SELECTED_SECTION_ACTION,
    SHOW_PRIORITY_MENU,
    HIDE_PRIORITY_MENU,
    SET_SECTION_PRIORITY,
    SET_USER_ID,
    TOGGLE_SIGNUP_MENU,
    TOGGLE_SIGN_IN_MENU,
    SET_USER_EMAIL,
    TOGGLE_SHARE_MENU,
    SHARE_TASK,
    REMOVE_TASK,
    SET_VALID_SHARE_EMAIL, SET_SHARED_WITH_EMAIL,
    TOGGLE_SHOW_REMOVE

} from './actions';

import {database} from "./firestore";
import {collectionName} from "./firestore";



// Initial state,

// Initial state contains a lot of information and stat variables, so I'll go over each one:

// sectionStack contains a stack of all sections, when a section is added it's pushed to the stack. This ensures that
    // more calls to query aren't needed as they can be done through the state.
// taskStack is similar to sectionStack, but is used to keep track of tasks in order to delete all tasks.
// sectionsToggled contains a list of sections toggled, or that when the sections are toggled, their tasks are
    // viewable in mobile view.
// showUndo: Isn't really needed anymore, but would show the undo menu before it was removed.
// showMenu, showPriorityMenu, ShowCompletedTasks, all exist to toggle on/off menu's associated with altering
// tasks or sections.
// selectedSection: keeps track of a section that's selected when a button is pressed in that section. This means
    // any action can apply the action to the item in the selectedSection state variable, which can be used by
    // different functions such as share section or sort section or remove section.
//show signUpMenu, showSignInMenu: show the menus needed in the splashScreen.
// showShareMenu: Shows the share section menu
// validShareEmail, shareEmailPressed: Keeps track in the share menu if the email being passed through is a valid
    // email, and if the button has been pressed. This is to return whether or not emails are valid, if they are, and
    // if the button has not been pressed yet, so no need to return email validity.
// showRemove: Keeps track of the remove section button,

const initialState = {
    sectionStack:[],
    taskStack: [],
    sectionsToggled: [],
    completedTasks: [],
    showUndo: false,
    showMenu: false,
    showPriorityMenu: false,
    showCompletedTasks: false,
    selectedSection: [],
    userID: "",
    userEmail: "",
    showSignUpMenu: false,
    showSignInMenu: false,
    showShareMenu: false,
    validShareEmail: true,
    shareEmailPressed: false,
    showRemove: false
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


// from line 142 - line 215 are funcitons that are no longer used.
// I am worried removing them might break the app with an undefined
// function, so I'm going to leave them
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

function deleteSection(state, sectionIdentifier) {
    const sections = state.sections.filter(sections => sections.identifier !== sectionIdentifier)
    return {
        ...state,
        sections
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

// function for creating a section.

function createSection(state) {
    // first part creates a new section in firestore.
    const identifier = uuidv4()
    const sectionRef = database.collection(collectionName).doc(identifier)
    sectionRef.set({
        identifier: identifier,
        title: "",
        sortType: 7,
        owner: state.userID,
        sharedWith: [state.userEmail]
    })


    return{
        ...state
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

// Clears all tasks and sections, including shared tasks but not shared sections.
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

                title: "",
                sortType: 7,
                owner: state.userID,
                sharedWith: [state.userEmail]}
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

// pushes the userID to the state at appSignedIn render
function setUserId(state, userId){
    return{
        ...state,
        userID: userId
    }
}

// pushes the user's email to the state at appSignedIn render
function setUserEmail(state, newuserEmail){
    return{
        ...state,
        userEmail: newuserEmail
    }
}

// toggles the signUpmenu in the splashScreen to on/off
function toggleSignUpMenu(state){
    return{
        ...state,
        showSignUpMenu: !(state.showSignUpMenu)
    }
}
// toggles the signInmenu in the splashScreen to on/off
function toggleSignInMenu(state){
    return{
        ...state,
        showSignInMenu: !(state.showSignInMenu)
    }
}

// toggles the shareSection Menu in the App to on/off
function toggleShareMenu(state){
    return{
        ...state,
        showShareMenu: !(state.showShareMenu)
    }
}

// allows for sharing sections.
// I don't know why I called it shareTask and not shareSection.
// I was very tired when I wrote this please forgive me.
function shareTask(state, inputEmail){
    const sharedWithList = state.selectedSection.sortType.map(x => x)
    sharedWithList.push(inputEmail)
    const sectionRef = database.collection(collectionName).doc(state.selectedSection.sectionIdentifier)
    sectionRef.update({
            sharedWith: sharedWithList
        }
    )
    return{
        ...state
    }
}

// allows for... removing access to a section not a task again I messed up the naming.
function removeTask(state){
    const sharedWithList = state.selectedSection.sortType.map(x => x)
    const newList = sharedWithList.filter(email => email !== state.userEmail)

    const sectionRef = database.collection(collectionName).doc(state.selectedSection.sectionIdentifier)
    sectionRef.update({
            sharedWith: newList
        }
    )
    return{
        ...state
    }
}

// checks if the email passed through is actually in email format, updates the state
function setValidShareEmail(state, value){
    let validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (value.match(validRegex)) {
        return{
            ...state,
            validShareEmail: true
        }
    }
    else{
        return{
            ...state,
            validShareEmail: false
        }
    }

}

// function to set whether the share Email Button is pressed and update the state.
function setSharedWithEmail(state, value){
    return{
        ...state,
        shareEmailPressed: value
}}

// function to toggle the show remove menu.
function toggleShowRemove(state){
    return{
        ...state,
        showRemove: !state.showRemove
    }
}

// Reducer!
export default function toDoReducer(state = initialState, action){
    switch (action.type){
        case CREATE_TASK: return createTask(state, action.payload.sectionIdentifier)
        case UPDATE_TASK_TEXT: return updateTaskText(state,action.payload)
        case TOGGLE_TASK_COMPLETION: return toggleTaskCompletion(state,action.payload)
        case DELETE_ALL_COMPLETED_TASK: return deleteAllCompletedTasks(state)
        case TOGGLE_TODO_LIST: return toggleToDoList(state)
        case TOGGLE_COMPLETED_LIST: return toggleCompletedList(state)
        case SHOW_MENU: return showMenu(state)
        case HIDE_MENU: return hideMenu(state)
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
        case SET_USER_ID: return setUserId(state, action.payload.userId)
        case SET_USER_EMAIL: return setUserEmail(state, action.payload.userEmail)
        case TOGGLE_SIGNUP_MENU: return toggleSignUpMenu(state)
        case TOGGLE_SIGN_IN_MENU: return toggleSignInMenu(state)
        case TOGGLE_SHARE_MENU: return toggleShareMenu(state)
        case SHARE_TASK: return shareTask(state, action.payload.inputEmail)
        case REMOVE_TASK: return removeTask(state)
        case SET_VALID_SHARE_EMAIL: return setValidShareEmail(state, action.payload.value)
        case SET_SHARED_WITH_EMAIL: return setSharedWithEmail(state, action.payload.value)
        case TOGGLE_SHOW_REMOVE: return toggleShowRemove(state)

        default:
            return state 
    }


}