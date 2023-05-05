import React, {useEffect} from "react";
import SuggestionItem from "../SuggestionItem";

function SuggestionGroup({array, handleClick}) {

    useEffect( () => {
        console.log(array)
    }, [])

    return (
        <ul>
            {
                array.map((elem, index) => {

                    return (<SuggestionItem elem={elem} handleClick={handleClick} key={`suggest-${index}`}/>)
                })
            }
        </ul>
    )
}

export default SuggestionGroup;

// .map est l'équivalent d'un Foreach()