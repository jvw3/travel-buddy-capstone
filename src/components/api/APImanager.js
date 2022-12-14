import { useEffect }  from "react";

//? This custom react hook will be used when observing initial state and fetching data.
export const useFetch = (url, setter) => {

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => setter(data));
  }, []);
};


//? This custom react hook will be used when observing state changes of specified state variable and fetching data.
export const useFetchObservingState = (url, setter, observedState) => {

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => setter(data));
  }, [observedState]);
};


export const useFetchForPutRequest = (url, setter, id) => {


}