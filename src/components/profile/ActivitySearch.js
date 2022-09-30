import { TextInput } from "@mantine/core";

export const ActivitySearch = ({ setterFunction }) => {
  return (
    <div className="search_header">
      <div>
      </div>
      <div>
        <TextInput
          onChange={(changeEvent) => {
            setterFunction(changeEvent.target.value);
          }}
          type="text"
          placeholder="Search activities by description"
        />
      </div>
    </div>
  );
};