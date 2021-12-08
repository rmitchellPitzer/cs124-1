import "./css/global.css"
import "typeface-roboto"
import ActionButton from "./components/Action Commands/ActionButton";
import AppDataController from "./modules/dataController/AppDataController";
import Header from './components/Header';

import ActionMenu from "./components/Action Commands/ActionMenu";
import { connect } from "react-redux";
import UndoButton from "./components/Undo/UndoButton";
import SectionList from "./components/newSection/SectionList";


import Sidebar from "./components/otherDisplays/sideBarList";
import SideList from "./components/otherDisplays/sideList";

import SideBarBackground from "./components/SideBarBackground";


import firebase from "firebase/compat";
import {useCollection} from "react-firebase-hooks/firestore";
import {database} from "./modules/dataController/firestore"
import {collectionName} from "./modules/dataController/firestore";
import store from "./modules/dataController/store";
import PriorityMenu from "./components/newSection/priorityMenu";


function App({menuIsActive,showUndo, priorityMenuIsActive}) {
    // contains a header, a background for the sidebar,and a div for displaying the
    // sidebar and sidelist in desktop view next to eachother.

    const query = database.collection(collectionName);
    const [value, loading, error] = useCollection(query);
    let fireStoreList = null;
    if (value) {
        fireStoreList = value.docs.map((doc) => {
            return {...doc.data()}});
    }



  return (
    <div class='hello'>
      <Header/>
      <SideBarBackground/>
        <div className="wideScreenDisplay">
            <div className="Sidebar"><Sidebar sections = {fireStoreList}/></div>
            <div className="Sidelist"><SideList sections = {fireStoreList}/></div>

        </div>
        <SectionList sections = {fireStoreList}/>
      { menuIsActive && <ActionMenu/> }
        { showUndo && <UndoButton/> }
        { priorityMenuIsActive && <PriorityMenu/>}
      <ActionButton/>
    </div>
  );
}


function mapToState(state) {

        return {
            menuIsActive: AppDataController.menuIsActive(),
            showUndo: AppDataController.undoIsActive(),
            priorityMenuIsActive: AppDataController.priorityMenuIsActive(),

        }
}

export default connect(mapToState)(App)