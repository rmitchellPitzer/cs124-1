import {createStore} from "redux"
import rootReducer  from "./reducer"

// creates the reducer

const store = createStore(rootReducer)
export default store 