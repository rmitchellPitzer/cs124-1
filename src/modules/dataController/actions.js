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

export const CLEAR_ALL = "clearAllSectionsAndTasks"

export const GET_TOGGLED = "getToggledStatus"


export const PUSH_COMPLETED_TASK = "pushCompletedTask"

export const TOGGLE_COMPLETED_SECTION_BUTTON = "toggleCompletedSection"

export const showUndoAction = () => ({type:SHOW_UNDO})
export const hideUndoAction = () => ({type:HIDE_UNDO})
export const undoTaskAction = () => ({type:UNDO_TASK})
export const showMenuAction = () => ({type:SHOW_MENU})
export const hideMenuAction = () => ({type:HIDE_MENU})
export const createTaskAction = (sectionIdentifier) => ({type:CREATE_TASK, payload:{sectionIdentifier}})
export const deleteTaskAction = (id) => ({type:DELETE_TASK, payload:{id}})
export const updateTaskTextAction = (id, identifier, text) => ({type: UPDATE_TASK_TEXT,payload: {id, identifier, text}})
export const toggleTaskCompletionAction = (id, identifier, isToggled) => ({type: TOGGLE_TASK_COMPLETION,payload:{id, identifier, isToggled}})
export const deleteAllCompletedTasksAction = () => ({type: DELETE_ALL_COMPLETED_TASK})
export const toggleCompletedListAction = () => ({type:TOGGLE_COMPLETED_LIST})
export const toggleToDoListAction = () => ({type:TOGGLE_TODO_LIST})

// functions for creating/deleting/editing section properties

export const createSectionAction = () => ({type: CREATE_SECTION})
export const deleteSectionAction = (sectionIdentifier) => ({type: DELETE_SECTION, payload: {sectionIdentifier}})
export const updateSectionTextAction = (sectionIdentifier,text) => ({type: UPDATE_SECTION_TEXT,payload: {sectionIdentifier, text}})

// function for toggling a section by just taking in id

export const toggleSectionAction = (sectionIdentifier) => ({type: TOGGLE_SECTION, payload: {sectionIdentifier}})

// function for clearing all sections and resetting all

export const clearAllSectionsAndTasksAction = () => ({type: CLEAR_ALL})

// function for showing tasks stored in firestore

export const getToggledStatusAction = (sectionIdentifier) => ({type: GET_TOGGLED, payload: {sectionIdentifier}})

export const pushCompletedTaskAction = (Task) => ({type: PUSH_COMPLETED_TASK, payload:{Task}})

export const toggleCompletedSectionAction = () => ({type: TOGGLE_COMPLETED_SECTION_BUTTON})