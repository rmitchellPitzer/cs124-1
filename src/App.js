import "./css/global.css"
import "typeface-roboto"
import ActionButton from "./components/Action Commands/ActionButton";
import AppDataController from "./modules/dataController/AppDataController";
import Header from './components/Header';

import ActionMenu from "./components/Action Commands/ActionMenu";
import { connect } from "react-redux";
import SectionList from "./components/newSection/SectionList";


import Sidebar from "./components/otherDisplays/sideBarList";
import SideList from "./components/otherDisplays/sideList";

import SideBarBackground from "./components/SideBarBackground";


import {useCollection} from "react-firebase-hooks/firestore";
import {database} from "./modules/dataController/firestore"
import {collectionName} from "./modules/dataController/firestore";
import PriorityMenu from "./components/newSection/priorityMenu";


function App({menuIsActive, priorityMenuIsActive}) {
    // gets different menu's status's from the redux state
    // Undo is not used at all.


    // Get the sections information from firestore
    const query = database.collection(collectionName);
    const [value, loading, error] = useCollection(query);
    let fireStoreList = null;
    if (value) {
        fireStoreList = value.docs.map((doc) => {
            return {...doc.data()}});

    }


// Returns both a widescreen format for tablets/desktops/landscape mode and a portrait mode
    // depending on screen orientation.
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
        { priorityMenuIsActive && <PriorityMenu/>}
      <ActionButton/>
    </div>
  );
}

// Getting those stuffs.
function mapToState(state) {

        return {
            menuIsActive: AppDataController.menuIsActive(),
            showUndo: AppDataController.undoIsActive(),
            priorityMenuIsActive: AppDataController.priorityMenuIsActive(),

        }
}

export default connect(mapToState)(App)