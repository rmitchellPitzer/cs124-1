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


function App({menuIsActive,showUndo}) {
    // contains a header, a background for the sidebar,and a div for displaying the
    // sidebar and sidelist in desktop view next to eachother.

    const query = database.collection(collectionName);
    const [value, loading, error] = useCollection(query);
    console.log("beginning of query")
    console.log(value)
    let fireStoreList = null;
    if (value) {
        fireStoreList = value.docs.map((doc) => {
            return {...doc.data()}});
    }
    console.log(fireStoreList)
    console.log(Date.now())
    let d = new Date()
    console.log(d.toString())


  return (
    <div class='hello'>
      <Header/>
      <SideBarBackground/>
        {/*<div className="wideScreenDisplay">*/}
        {/*    <div className="Sidebar"><Sidebar/></div>*/}
        {/*    <div className="Sidelist"><SideList/></div>*/}

        {/*</div>*/}
        <SectionList sections = {fireStoreList}/>
      { menuIsActive && <ActionMenu/> }
        { showUndo && <UndoButton/> }
      <ActionButton/>
    </div>
  );
}


function mapToState(state) {
        console.log(store.getState())
        return {
            menuIsActive: AppDataController.menuIsActive(),
            showUndo: AppDataController.undoIsActive()
        }
}

export default connect(mapToState)(App)