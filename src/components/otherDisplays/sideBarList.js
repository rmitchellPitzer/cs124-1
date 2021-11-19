import { connect} from "react-redux";
import TaskDataController from "../../modules/dataController/TaskDataController";
import "../../css/Sidebar.css"
import SectionBar from "../newSection/SectionBar"
import SectionContainer from "../newSection/SectionContainer";
import SideBarElement from "./sideBarElement";


function Sidebar(props){
    console.log(props.sections)
    return(
            <div class= "SideBarcontainer">
                {
                    props.sections.map(section => {
                        return <SideBarElement
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


export default connect(mapStateToProps)(Sidebar);