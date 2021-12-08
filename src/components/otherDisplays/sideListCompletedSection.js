import "../../css/sideList.css"
import store from "../../modules/dataController/store";
import {connect} from "react-redux";
import SideListCompletedSectionTask from "./sideListCompletedSectionTask";



// creates the completed section and it's tasks in the right side list.

function SideListCompletedSection(props) {

        return (
            <div
                class="SideListElement"
                aria-label="This is a Completed Section Header"
                id = "completedSectionHeaderlist">
                <div
                    aria-label="This is the completed Section Header"
                    className="sideListTitle"
                    // class="bar-title"
                    type='text'
                    alt='task text'
                    // alt='Section text'
                    value="Completed"
                >Completed</div>
                <div>{
                props.completedTasks.map(task => {
                    return <SideListCompletedSectionTask
                        {...task}
                        key={task.id}
                    />
                })}
                </div>
            </div>
        )
}









function mapStateToProps(state){
    return{
        completedTasks: store.getState().completedTasks}
}

export default connect(mapStateToProps)(SideListCompletedSection)
