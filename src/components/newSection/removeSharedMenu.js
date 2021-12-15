import "../../css/prioritySortButton.css"
import "../../css/shareGui.css"
import TaskDataController from "../../modules/dataController/TaskDataController.js"
import AppDataController from "../../modules/dataController/AppDataController.js"



// Creates the remove section menu, includes a list of options to choose from
// includes a title as well to show what sorting is being used.


function RemoveSharedMenu(props, selectedSection) {

    return (
        <div className="shareMenuOrientation">
            <div className="shareMenuContainer">
                <div className="shareTitle">Do you want to revoke your access to this section?</div>
                <button className="ShareButton"
                        onClick={() =>
                            handleOnClick(props, selectedSection)}>
                    Yes</button>
            </div>
            <div className="overlay"
                 onClick={() => AppDataController.toggleShowRemove()}></div>

        </div>)




    function handleOnClick() {
        TaskDataController.removeTask()
        AppDataController.toggleShowRemove()
    }


}




export default RemoveSharedMenu