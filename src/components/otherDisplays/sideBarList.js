import { connect} from "react-redux";
import TaskDataController from "../../modules/dataController/TaskDataController";
import "../../css/Sidebar.css"
import SideBarElement from "./sideBarElement";


// Creates the sidebar on the left side of the viewport in desktop/portrait view.
// contains a list of sidebar elements from sideBarElement.

function Sidebar(props){
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