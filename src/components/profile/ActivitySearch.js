import { TextInput, Center } from "@mantine/core";
import "./profile.css"

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