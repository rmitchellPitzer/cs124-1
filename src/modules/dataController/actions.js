export const CREATE_TASK = "createTask"
export const DELETE_TASK = "deleteTask"
export const UPDATE_TASK_TEXT = "updateTaskText"
export const TOGGLE_TASK_COMPLETION = "toggleTaskCompletion"
export const DELETE_ALL_COMPLETED_TASK = "deleteAllCompletedTasks"
export const TOGGLE_TODO_LIST = "toggleTodoList"
export const TOGGLE_COMPLETED_LIST = "toggleCompletedList"
export const SHOW_MENU = "showMenu"
export const HIDE_MENU = "hideMenu"
export const UNDO_TASK = "undoTask"
export const SHOW_UNDO = "showUndo"
export const HIDE_UNDO = "hideUndo"

export const CREATE_SECTION = "createSection"
export const DELETE_SECTION = "deleteSection"
export const UPDATE_SECTION_TEXT = "updateSectionText"
export const TOGGLE_SECTION = "toggleSection"

export const showUndoAction = () => ({type:SHOW_UNDO})
export const hideUndoAction = () => ({type:HIDE_UNDO})
export const undoTaskAction = () => ({type:UNDO_TASK})
export const showMenuAction = () => ({type:SHOW_MENU})
export const hideMenuAction = () => ({type:HIDE_MENU})
export const createTaskAction = (sectionIdentifier) => ({type:CREATE_TASK, payload:{sectionIdentifier}})
export const deleteTaskAction = (id) => ({type:DELETE_TASK, payload:{id}})
export const updateTaskTextAction = (id,text) => ({type: UPDATE_TASK_TEXT,payload: {id,text}})
export const toggleTaskCompletionAction = (id) => ({type: TOGGLE_TASK_COMPLETION,payload:{id}})
export const deleteAllCompletedTasksAction = () => ({type: DELETE_ALL_COMPLETED_TASK})
export const toggleCompletedListAction = () => ({type:TOGGLE_COMPLETED_LIST})
export const toggleToDoListAction = () => ({type:TOGGLE_TODO_LIST})

export const createSectionAction = () => ({type: CREATE_SECTION})
export const deleteSectionAction = (sectionIdentifier) => ({type: DELETE_SECTION, payload: {sectionIdentifier}})
export const updateSectionTextAction = (sectionIdentifier,text) => ({type: UPDATE_SECTION_TEXT,payload: {sectionIdentifier, text}})
export const toggleSectionAction = (sectionIdentifier) => ({type: TOGGLE_SECTION, payload: {sectionIdentifier}})