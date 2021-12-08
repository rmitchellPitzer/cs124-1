import { connect} from "react-redux";
import TaskDataController from "../../modules/dataController/TaskDataController";
import "../../css/sidebar.css"
import SideBarElement from "./sideBarElement";
import SideBarCompletedSection from "./sideBarCompletedSection";


// Creates the sidebar on the left side of the viewport in desktop/portrait view.
// contains a list of sidebar elements from sideBarElement.

function Sidebar(props) {
    if (props.sections) {
        console.log("These are the sections")
        console.log(props.sections)
        return (
            <div class="SideBarcontainer">
                {
                    props.sections.map(section => {
                        return <SideBarElement
                            {...section}
                            key={section.identifier}
                        />
                    })
                }
                <SideBarCompletedSection/>
            </div>
        )
    }
    else{
        return null
    }
}

// function mapStateToProps(state, ownProps){
//     return{
//         sections: TaskDataController.getSections()}
// }
//
//
// export default connect(mapStateToProps)(Sidebar);
export default Sidebar