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
export const SET_SECTION_TO_STACK = "setSectionToStack"
export const SET_TASKS_TO_STACK = "setTasksToStack"
export const UPDATE_TASK_PRIORITY = "updateTaskPriority"
export const PUSH_SELECTED_SECTION_ACTION = "pushSelectedSectionAction"
export const SHOW_PRIORITY_MENU = "showPriorityMenu"
export const HIDE_PRIORITY_MENU = "hidePriorityMenu"
export const SET_SECTION_PRIORITY = "setSectionPriority"
export const SET_USER_ID = "setUserId"
export const SET_USER_EMAIL = "setUserEmail"
export const TOGGLE_SIGNUP_MENU = "toggleSignUpMenu"
export const TOGGLE_SIGN_IN_MENU = "toggleSignInMenu"
export const TOGGLE_SHARE_MENU = "showShareMenu"
export const SHARE_TASK = "shareTask"
export const REMOVE_TASK = "removeTask"
export const SET_VALID_SHARE_EMAIL = "setValidShareEmail"
export const SET_SHARED_WITH_EMAIL = "setSharedWithEmail"
export const TOGGLE_SHOW_REMOVE = "toggleShowRemove"





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

// functions for showing tasks stored in firestore or getting section/task properties.

export const getToggledStatusAction = (sectionIdentifier) => ({type: GET_TOGGLED, payload: {sectionIdentifier}})

export const pushCompletedTaskAction = (Task) => ({type: PUSH_COMPLETED_TASK, payload:{Task}})

export const toggleCompletedSectionAction = () => ({type: TOGGLE_COMPLETED_SECTION_BUTTON})

// functions for pushing tasks or sections to the state

export const setSectionToStackAction = (stackList) => ({type: SET_SECTION_TO_STACK, payload:{stackList}})

export const setTasksToStackAction = (taskList) => ({type: SET_TASKS_TO_STACK, payload:{taskList}})

// functions for showing priority menu/hiding it/setting the priority/getting the current selected section

export const showPriorityMenuAction = () => ({type: SHOW_PRIORITY_MENU})

export const hidePriorityMenuAction = () => ({type: HIDE_PRIORITY_MENU})

export const updateTaskPriorityAction = (id, sectionIdentifier, value) => ({type: UPDATE_TASK_PRIORITY, payload:{id, sectionIdentifier, value}})

export const setSectionPriorityAction = (value) => ({type: SET_SECTION_PRIORITY, payload:{value}})


// used for pushing the selected section to the state, that way any queries needed to perform or any actions needed to be
// performed on the element can be done without needing to pass in props everywhere.

export const pushSelectedSectionAction = (sectionIdentifier, sortType ) => ({type: PUSH_SELECTED_SECTION_ACTION, payload:{sectionIdentifier, sortType}})

// functions for enabling authorization by setting userID/email in the state, allowing all components to access it.

export const setUserIdAction = (userId) => ({type: SET_USER_ID, payload:{userId}})

export const setUserEmailAction = (userEmail) => ({type: SET_USER_EMAIL, payload:{userEmail}})

// different functions for menu functions, such as opening the signup menu or signin menu for firestore.

export const toggleSignUpMenuAction = () => ({type: TOGGLE_SIGNUP_MENU})

export const toggleSignInMenuAction = () => ({type: TOGGLE_SIGN_IN_MENU})

export const toggleShareMenuAction = () => ({type: TOGGLE_SHARE_MENU})

export const shareTaskAction = (inputEmail) => ({type: SHARE_TASK, payload:{inputEmail}})

export const removeTaskAction = () => ({type: REMOVE_TASK})

export const setValidShareEmailAction = (value) => ({type: SET_VALID_SHARE_EMAIL, payload: {value}})

export const setSharedWithEmailAction = (value) => ({type: SET_SHARED_WITH_EMAIL, payload: {value}})

export const toggleShowRemoveAction = () => ({type: TOGGLE_SHOW_REMOVE})



