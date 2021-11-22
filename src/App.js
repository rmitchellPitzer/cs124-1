import "./css/global.css"
import "typeface-roboto"
import ActionButton from "./components/Action Commands/ActionButton";
import AppDataController from "./modules/dataController/AppDataController";
import Header from './components/Header';
import SectionContainer from "./components/newSection/SectionContainer.js"
import ActionMenu from "./components/Action Commands/ActionMenu";
import { connect } from "react-redux";
import UndoButton from "./components/Undo/UndoButton";
import SectionList from "./components/newSection/SectionList";
import initialState from "./modules/dataController/TaskDataController"
import store from "./modules/dataController/store";
import TaskDataController from "./modules/dataController/TaskDataController";

import SectionBar from "./components/newSection/SectionBar";

import Sidebar from "./components/otherDisplays/sideBarList";
import SideList from "./components/otherDisplays/sideList";
import SideListElement from "./components/otherDisplays/sideListElement";
import SideBarBackground from "./components/SideBarBackground";


import { Link, animateScroll as scroll } from "react-scroll";



function App({menuIsActive,showUndo}) {
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
      <ActionButton/>
      { showUndo && <UndoButton/> }
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