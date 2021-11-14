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
    TOGGLE_SECTION
} from './actions';

const initialState = {
    stack:[],
    sections: [{text:"To Do", isToggled:false, identifier:"toDo", tasks: []}, {text:"Completed", isToggled:false, identifier:"completed", tasks:[]}],
    showUndo: false,
    showMenu: false 
}

function createTask(state, sectionIdentifier) {
    const id = uuidv4()
    const sectionID = sectionIdentifier
    const task = {text:"",isCompleted:false,id, sectionID}
    const newSections = state.sections.map(x => x)
    const sectionToChange = newSections.find(section => section.identifier === sectionIdentifier)

    const newSection = sectionToChange.tasks.push(task)

    return {
        ...state,
        sections:newSections
    }
}

function deleteTask(state,id) {
    const tasks = state.tasks.filter(task => task.id !== id)
    return {
        ...state,
        tasks
    }
}








function updateTaskText(state,{id, identifier,text}) {
    const returnedSections = state.sections.map(x => x)
    const sectionWithTask = returnedSections.find(section => section.identifier === identifier)
    const newTasks = sectionWithTask.tasks.map(x => x)
    const taskToChange = newTasks.find(task => task.id === id)
    if (!taskToChange) return state

    taskToChange.text = text


    return {
        ...state,
        sections: returnedSections
    }
}

function toggleTaskCompletion(state,{id, identifier}) {
    const returnedSections = state.sections.map(x => x)
    const sectionWithTask = returnedSections.find(section => section.identifier === identifier)
    const taskToChange = sectionWithTask.tasks.find(task => task.id === id)
    if (!taskToChange){
        const completedSection = returnedSections.find(section => section.identifier === "completed")
        const completedTask = completedSection.tasks.find(task => task.id === id)
        let taskIndex = completedSection.tasks.indexOf(completedTask)
        completedTask.isCompleted = !completedTask.isCompleted
        returnedSections.find(section => section.identifier === identifier).tasks.push(completedTask)
        returnedSections.find(section => section.identifier === "completed").tasks.splice(taskIndex, 1)
    }
    else{
        let taskIndex = sectionWithTask.tasks.indexOf(taskToChange)
        taskToChange.isCompleted = !taskToChange.isCompleted
        returnedSections.find(section => section.identifier === "completed").tasks.push(taskToChange)
        returnedSections.find(section => section.identifier === identifier).tasks.splice(taskIndex, 1)
    }

    return {
        ...state,
        sections:returnedSections
    }

}

function deleteAllCompletedTasks(state) {
    const stack = state.stack.map(x => x)
    stack.push(state.sections.find(section => section.identifier === "completed").tasks)

    const newSections = state.sections.map(x => x)
    newSections.find(section => section.identifier === "completed").tasks = []

   return {
       ...state,
       stack,
       sections:newSections
   }
}


function undoTask(state) {
    const stack = state.stack.map(x => x)
    const newSections = state.sections.map(x => x)
    const completedSection = newSections.find(section => section.identifier === "completed")
    completedSection.tasks = stack.pop()

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

function createSection(state) {
    const identifier = uuidv4()
    const section = {text:"",isToggled:false, identifier: identifier, tasks: []}
    const newSections = state.sections.map(x => x)
    newSections.push(section)
    console.log("Hello!")
    const completedSection = newSections.find(section => section.identifier === "completed")
    let completedSectionIndex = newSections.indexOf(completedSection)
    console.log(completedSection)
    console.log(completedSectionIndex)
    console.log(newSections)
    newSections.splice(completedSectionIndex, 1)
    newSections.push(completedSection)
    return {
        ...state,
        sections:newSections
    }
}

function deleteSection(state, sectionIdentifier) {
    const sections = state.sections.filter(sections => sections.identifier !== sectionIdentifier)
    return {
        ...state,
        sections
    }
}

function updateSectionText(state,{sectionIdentifier,text}){
    const newSections = state.sections.map(x => x)
    const section = newSections.find(section => section.identifier === sectionIdentifier)
    if (!section) return state

    section.text = text


    return {
        ...state,
        sections: newSections
    }
}

function toggleSection(state, sectionIdentifier) {
    const newSections = state.sections.map(x => x)
    const sectionToToggle = newSections.find(section => section.identifier === sectionIdentifier)
    if (!sectionToToggle) return state

    sectionToToggle.isToggled = !sectionToToggle.isToggled
    return {
        ...state,
        sections: newSections
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
        default:
            return state 
    }


}