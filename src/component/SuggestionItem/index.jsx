import React from "react";
import { useLocation } from "../../utils/hook/useLocation";

function SuggestionItem({elem, handleClick}) {

    const location = useLocation()

    const click = () => {
        handleClick()
        location.addMarker(long, lat)
    }

    const [lat, long] = elem.geometry.coordinates
    const label = elem.properties.label

    return (
        <li onClick={click}>{label}</li>
    )
}

export default SuggestionItem;