import { TextInput, Center } from "@mantine/core";
import "./profile.css"

// This component is responsible for taking the changeEvent.target.value of what is typed into the searchbar and the setterFunction will store it in the state variable.
export const ActivitySearch = ({ setterFunction }) => {
  return (
    <Center>
      <div className="searchbar">
        <TextInput
          onChange={(changeEvent) => {
            setterFunction(changeEvent.target.value);
          }}
          type="text"
          placeholder="Search all activities by type"
        />
      </div>
      </Center>
  );
};