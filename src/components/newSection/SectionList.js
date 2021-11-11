import SectionContainer from "./SectionContainer";
import Task from "../Tasks/Task";

/*
props:{
    sections: Section

 */



export default function SectionList(props){
    return(
        <div class='container'>
            {
                props.sections.map(section => {
                    return <section
                        {...section}
                        key={section.identifier}
                    />
                })
            }



        </div>
    )
}