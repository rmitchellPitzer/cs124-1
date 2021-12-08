import "../../css/bar.css"
import CompletedSectionButton from "./completedSectionButton";


// This displays the completed section in portrait view.
// Needs to be a separate section due to it's unique nature.
function CompletedSection(props) {
    let cssID = "completedSectionText";
    return (
        <div class={"barCompleted"} id={"bar" + cssID}>
            <CompletedSectionButton text = {props.sectionTitle}/>
            <div
                aria-label={props.sectionTitle ? "Edit the section title of" + props.sectionTitle : "Edit the title of an empty section"}
                class="bar-title"
                id={cssID}
                type='text'
                alt='Completed text'
                value="Completed"
            >Completed</div>
        </div>)
}


export default CompletedSection