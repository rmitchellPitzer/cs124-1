import {
    hideMenuAction,
    hideUndoAction,
    showMenuAction,
    showUndoAction,
    toggleCompletedListAction,
    toggleToDoListAction,
    toggleUndoAction,
    undoTaskAction,
    toggleCompletedSectionAction,
    pushSelectedSectionAction,
    showPriorityMenuAction,
    hidePriorityMenuAction,
    setUserIdAction,
    toggleSignUpMenuAction,
    toggleSignInMenuAction,
    setUserEmailAction,
    toggleShareMenuAction, setValidShareEmailAction, setSharedWithEmailAction, toggleShowRemoveAction
} from "./actions.js"
import store from "./store.js"

export default class AppDataController {

    static toggleTodoList() {
        const action = toggleToDoListAction()
        store.dispatch(action)
    }

    static showToDo() {
        return store.getState().showTodo 
    }
    
    static showCompleted() {
        return store.getState().showCompleted 
    }

    static showMenu() {
        const action = showMenuAction()
        store.dispatch(action)
    }

    static closeMenu() {
        const action = hideMenuAction()
        store.dispatch(action)
    }

    static menuIsActive() {
        return store.getState().showMenu
    }

    static toggleCompletedList() {
        const action = toggleCompletedListAction()
        store.dispatch(action)
    }

    static showUndo() {
        const action = showUndoAction()
        store.dispatch(action)
    }

    static hideUndo() {
        const action = hideUndoAction()
        store.dispatch(action)
    }

    static undoTask() {
        const action = undoTaskAction()
        store.dispatch(action)
    }

    static undoIsActive() {
        return store.getState().showUndo 
    }

    static toggleCompletedSection() {
        const action =  toggleCompletedSectionAction()
        store.dispatch(action)
    }

    static pushSelectedSection(sectionIdentifier, sortType){
        const action =  pushSelectedSectionAction(sectionIdentifier, sortType)
        store.dispatch(action)
    }

    static priorityMenuIsActive() {
        return store.getState().showPriorityMenu
    }

    static showPriorityMenu() {
        const action = showPriorityMenuAction()
        store.dispatch(action)
    }

    static hidePriorityMenu() {
        const action = hidePriorityMenuAction()
        store.dispatch(action)
    }

    static setUserId(userId) {
        const action = setUserIdAction(userId)
        store.dispatch(action)
    }

    static setUserEmail(userEmail) {
        const action = setUserEmailAction(userEmail)
        store.dispatch(action)
    }

    static toggleSignUpMenu(){
        const action = toggleSignUpMenuAction()
        store.dispatch(action)
    }

    static toggleSignInMenu(){
        const action = toggleSignInMenuAction()
        store.dispatch(action)
    }

    static toggleShareMenu(){
        const action = toggleShareMenuAction()
        store.dispatch(action)
    }

    static setValidShareEmail(value){
        const action = setValidShareEmailAction(value)
        store.dispatch(action)
    }

    static setSharedWithEmail(value){
        const action = setSharedWithEmailAction(value)
        store.dispatch(action)

    }

    static toggleShowRemove(){
        const action = toggleShowRemoveAction()
        store.dispatch(action)
    }

}