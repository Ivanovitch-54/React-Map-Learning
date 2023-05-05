import React, { useEffect, useState } from "react";
import { useAxios } from "../../utils/hook/useAxios";
import { useLocation } from "../../utils/hook/useLocation";
import SuggestionGroup from "../SuggestionGroup";

function StreetInput() {
  const axios = useAxios();
  const location = useLocation();
  const [start, setStart] = useState("");
  const [data, setData] = useState([]);

  const clearInput = () => {
    setStart("");
  };

  const handlechange = (e) => {
    const value = e.target.value;
    setStart(value);
  };

  useEffect(() => {
    if (start.length > 2) {
      axios
        .getAdresse(start, location.location)
        .then((res) => {
          setData(res.data.features)
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      setData([]);
    }
  }, [start]);

  return (
    <>
      <div className="form">
        <input
          type="text"
          name="start"
          id="start"
          placeholder="Adresse"
          value={start}
          onChange={handlechange}
        />
        {data.length > 0 && <SuggestionGroup handleClick={clearInput} array={data} />}
      </div>
    </>
  );
}

export default StreetInput;

// array={data} est un param
