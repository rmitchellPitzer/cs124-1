import SectionContainer from "./SectionContainer";
import TaskDataController from "../../modules/dataController/TaskDataController"
import SectionBar from "./SectionBar"
import { connect } from "react-redux"
/*
props:{
    sections: Section

 */



function SectionList(props){
    return(
        <div class='container'>
            {
                props.sections.map(section => {
                    return <SectionContainer
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

export default connect(mapStateToProps)(SectionList)