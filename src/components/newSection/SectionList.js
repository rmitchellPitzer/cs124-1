import SectionContainer from "./SectionContainer";
import TaskDataController from "../../modules/dataController/TaskDataController"
import SectionBar from "./SectionBar"

/*
props:{
    sections: Section

 */



export default function SectionList(props){
    console.log(props.lists)
    return(
        <div class='container'>
            {
                props.lists.map(section => {
                    return <SectionContainer
                        {...section}
                        key={section.identifier}
                    />
                })
            }
        </div>
    )
}