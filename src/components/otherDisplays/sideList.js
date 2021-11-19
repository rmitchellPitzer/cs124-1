import { connect } from "react-redux"
import TaskDataController from "../../modules/dataController/TaskDataController"
import SectionContainer from "../newSection/SectionContainer";
import SideListElement from "./sideListElement";


function SideList(props){
    return(
        <div class='SideListContainer'>
            {
                props.sections.map(section => {
                    return <SideListElement
                        {...section}
                        key={section.identifier}
                    />
                })
            }
        </div>
    )
}


function mapStateToProps(state, ownProps){
    return{
        sections: TaskDataController.getSections()}
}

export default connect(mapStateToProps)(SideList)