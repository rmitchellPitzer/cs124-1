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
    const newState = state.tasks.map(x => x)
    newState.push(task)


    return {
        ...state,
        tasks:newState
    }
}

function deleteTask(state,id) {
    const tasks = state.tasks.filter(task => task.id !== id)
    return {
        ...state,
        tasks 
    }
}

function updateTaskText(state,{id,text}) {
    const newTasks = state.tasks.map(x => x)
    const task = newTasks.find(task => task.id === id)
    if (!task) return state

    task.text = text 


    return {
        ...state,
        tasks: newTasks
    }
}

function toggleTaskCompletion(state,id) {
    const newTasks = state.tasks.map(x => x)
    const task = newTasks.find(task => task.id === id)
    task.isCompleted = !task.isCompleted

    return {
        ...state,
        tasks:newTasks 
    }

}

function deleteAllCompletedTasks(state) {
    const stack = state.stack.map(x => x)
    stack.push(state.tasks)

   const newTasks = state.tasks.filter(task => task.isCompleted !== true)
   return {
       ...state,
       stack,
       tasks:newTasks 
   }
}


function undoTask(state) {
    const stack = state.stack.map(x => x)

    return {
        ...state,
        tasks: stack.pop(),
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
    const newState = state.sections.map(x => x)
    newState.push(section)
    return {
        ...state,
        sections:newState
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
    console.log(text)
    console.log(sectionIdentifier)
    const newSections = state.sections.map(x => x)
    const section = newSections.find(section => section.identifier === sectionIdentifier)
    if (!section) return state

    section.text = text


    return {
        ...state,
        sections: newSections
    }
}

function toggleSelection(state, sectionIdentifier) {
    const newSections = state.sections.map(x => x)
    const section = newSections.find(section => section.identifier === sectionIdentifier)
    if (!section) return state

    section.isToggled = !section.isToggled
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
        case TOGGLE_TASK_COMPLETION: return toggleTaskCompletion(state,action.payload.id)
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
        case TOGGLE_SECTION: return toggleSelection(state, action.payload.sectionIdentifier)
        default:
            return state 
    }


}