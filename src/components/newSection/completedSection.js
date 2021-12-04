import store from "../../modules/dataController/store";
import {connect} from "react-redux";


function CompletedSection(props) {

}



function mapToState(state, ownProps) {
    console.log("Calling get toggled status")
    console.log(store.getState().sectionsToggled)
    return {
        isToggledList: store.getState().sectionsToggled
    }
}
//
export default connect(mapToState)(CompletedSection)