import { TextInput } from "@mantine/core";
import "./profile.css"

export const ActivitySearch = ({ setterFunction }) => {
  return (
      <div className="searchbar">
        <TextInput
          onChange={(changeEvent) => {
            setterFunction(changeEvent.target.value);
          }}
          type="text"
          placeholder="Search all activities by description"
        />
      </div>
  );
};