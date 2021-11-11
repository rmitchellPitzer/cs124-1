import { createTaskAction, deleteAllCompletedTasksAction, deleteTaskAction, toggleTaskCompletionAction, updateTaskTextAction, createSectionAction, deleteSectionAction, updateSectionTextAction, toggleSectionAction } from "./actions"
import store from "./store.js"
class TaskDataController {
    static updateTaskText(id,text) {
            const action = updateTaskTextAction(id,text)
            store.dispatch(action)
    }

    static toggleTaskCompletion(id) {
        const action = toggleTaskCompletionAction(id)
        console.log("Task complete Action: ", action)
        store.dispatch(action)
    }

    static createTask(sectionIdentifier) {
        console.log("TaskDataController.CreateTask", sectionIdentifier)
        const action = createTaskAction(sectionIdentifier)
        console.log("Action: ", action)
        store.dispatch(action)
    }

    static deleteTask(id) {
        const action = deleteTaskAction(id)
        store.dispatch(action)
    }

    static deleteAllCompleted() {
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


    static createSection() {
        const action = createSectionAction()
        store.dispatch(action)
    }

    static deleteSection(sectionIdentifier) {
        const action = deleteSectionAction(sectionIdentifier)
        store.dispatch(action)
    }

    static updateSectionText(sectionIdentifier,text) {
        console.log(sectionIdentifier)
        const action = updateSectionTextAction(sectionIdentifier,text)
        store.dispatch(action)
    }

    static toggleSection(sectionIdentifier) {
        const action = toggleSectionAction(sectionIdentifier)
        store.dispatch(action)
    }


};


export default TaskDataController