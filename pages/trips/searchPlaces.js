import React, { useState, useEffect, useRef } from "react";
import { TypeInput, SelectInput} from "../../components/MapInput";

let autoComplete;

const loadScript = (url, callback) => {
  let script = document.createElement("script");
  script.type = "text/javascript";

  if (script.readyState) {
    script.onreadystatechange = function() {
      if (script.readyState === "loaded" || script.readyState === "complete") {
        script.onreadystatechange = null;
        callback();
      }
    };
  } else {
    script.onload = () => callback();
  }

  script.src = url;
  document.getElementsByTagName("head")[0].appendChild(script);
};

function handleScriptLoad(updateQuery, autoCompleteRef) {
  autoComplete = new window.google.maps.places.Autocomplete(
    autoCompleteRef.current,
    // { types: ["(cities)"], componentRestrictions: { country: "us" } }
    { types: ["(cities)"], componentRestrictions: { country: "ng" } }
  );
  autoComplete.setFields(["address_components", "formatted_address", "geometry"]);
  autoComplete.addListener("place_changed", () =>
    handlePlaceSelect(updateQuery)
  );
}

async function handlePlaceSelect(updateQuery) {
  const addressObject = autoComplete.getPlace();
  const query = addressObject.formatted_address;
  updateQuery(query);
  console.log(addressObject);
}

  const key= "AIzaSyAm00Wsdh6jJB2QzlW5c6t_nu0gMRAZB9s";
  // const key= "AIzaSyDWLwUNUCh-ON8nTTvdKd6VVlDZDquwi-I";

function SearchLocationInput() {
  const [query, setQuery] = useState("");
  const autoCompleteRef = useRef(null);

  useEffect(() => {
    loadScript(
      `https://maps.googleapis.com/maps/api/js?key=${key}&libraries=places`,
      () => handleScriptLoad(setQuery, autoCompleteRef)
    );
  }, []);

  const onChange = event => setQuery(event.target.value);
  return (
    <div className="search-location-input">
      {/* <input
        ref={autoCompleteRef}
        onChange={onChange}
        placeholder="Enter a City"
        value={query}
      /> */}
      <TypeInput
              type="text"
              name="origin"
              placeholder="Start from ..."
              ref={autoCompleteRef}
              onChange={onChange}
              value={query}
              // ref={register({
              //   required: "Please enter your takeoff location"
              // })}
              // onBlur={onBlur}
            />
    </div>
  );
}

export default SearchLocationInput;