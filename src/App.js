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

function App({menuIsActive,showUndo}) {

  return (
    <div class='container'>
      <Header/>

        <SectionList
            lists = {TaskDataController.getSections()}/>

      {/*<SectionContainer */}
      {/*  className='todo-bar' */}
      {/*  sectionTitle="To Do"*/}
      {/*  identifier="toDo"*/}
      {/*/>*/}
      {/*<SectionContainer */}
      {/*  className='completed-bar' */}
      {/*  sectionTitle="Completed"*/}
      {/*  identifier="completed"*/}
      {/*/>*/}
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