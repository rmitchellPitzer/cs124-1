import { createTaskAction, deleteAllCompletedTasksAction, deleteTaskAction, toggleTaskCompletionAction, updateTaskTextAction, createSectionAction, deleteSectionAction, updateSectionTextAction, toggleSectionAction, clearAllSectionsAndTasksAction } from "./actions"
import store from "./store.js"
class TaskDataController {
    static updateTaskText(id, identifier, text) {
            const action = updateTaskTextAction(id, identifier ,text)
            store.dispatch(action)
    }

    static toggleTaskCompletion(id, identifier) {
        const action = toggleTaskCompletionAction(id, identifier)
        store.dispatch(action)
    }

    static createTask(sectionIdentifier) {
        const action = createTaskAction(sectionIdentifier)
        store.dispatch(action)
    }

    static deleteTask(id) {
        const action = deleteTaskAction(id)
        store.dispatch(action)
    }

    // static deleteAllCompleted() {
    //     console.log("This is the state at the beginning of deleteAllCompletedTasks")
    //     console.log(store.getState())
    //     const action = deleteAllCompletedTasksAction()
    //     store.dispatch(action)
    // }

    static deleteAllCompleted() {
        console.log("This is the state at the beginning of deleteAllCompletedTasks")
        console.log(store.getState())
        const action = deleteAllCompletedTasksAction()
        store.dispatch(action)
    }

    static todo() {
        return store.getState()
        .tasks.filter(task => task.isCompleted === false)
    }

    static completed() {
        return store.getState()
        .tasks.filter(task => task.isCompleted === true)
    }

    // new function to return general tasks, not finished yet

    static getTasks(identifier) {
        return store.getState().sections.filter(section => section.identifier === identifier)
    }

    // new function to get sections

    static getSections() {
        return store.getState().sections
    }


    static createSection() {
        const action = createSectionAction()
        store.dispatch(action)
    }

    static deleteSection(sectionIdentifier) {
        const action = deleteSectionAction(sectionIdentifier)
        store.dispatch(action)
    }

    static updateSectionText(sectionIdentifier,text) {
        const action = updateSectionTextAction(sectionIdentifier,text)
        store.dispatch(action)
    }

    static toggleSection(sectionIdentifier) {
        const action = toggleSectionAction(sectionIdentifier)
        store.dispatch(action)
    }

    static clearAllSectionsAndTasks() {
        console.log(store.getState())
        const action = clearAllSectionsAndTasksAction()
        store.dispatch(action)
    }


};


export default TaskDataController