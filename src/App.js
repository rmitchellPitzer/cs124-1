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

// Here's lab3 + lab5 work... lab 3.5... lab 3/5... 5.3? lab ((3+5)/2)... 4?
// just going to do lab 3 and lab 5 concurrently.


import firebase from "firebase/compat";
import {  useCollection } from "react-firebase-hooks/firestore";
import {
    useAuthState,
    useCreateUserWithEmailAndPassword,
    useSignInWithEmailAndPassword
} from 'react-firebase-hooks/auth';





function App({menuIsActive,showUndo}) {
    // contains a header, a background for the sidebar,and a div for displaying the
    // sidebar and sidelist in desktop view next to eachother.

  return (
    <div class='hello'>
      <Header/>
      <SideBarBackground/>
        <div className="wideScreenDisplay">
            <div className="Sidebar"><Sidebar/></div>
            <div className="Sidelist"><SideList/></div>

        </div>
        <SectionList/>
      { menuIsActive && <ActionMenu/> }
        { showUndo && <UndoButton/> }
      <ActionButton/>
    </div>
  );
}


function mapToState(state) {
  return {
    menuIsActive: AppDataController.menuIsActive(),
    showUndo: AppDataController.undoIsActive()
  }
}

export default connect(mapToState)(App)