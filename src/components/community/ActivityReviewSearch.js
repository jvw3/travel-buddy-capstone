import { TextInput } from "@mantine/core";

export const ActivityReviewSearch = ({ reviewSetterFunction, descriptionSetterFunction }) => {
  return (
    <>
    
          <div className="searchbars">
      <div>
        <TextInput
          onChange={(changeEvent) => {
              descriptionSetterFunction(changeEvent.target.value);
            }}
            type="text"
            placeholder="Search by description"
            />
      </div>
      <div>
        <TextInput
          onChange={(changeEvent) => {
              reviewSetterFunction(changeEvent.target.value);
            }}
            type="text"
            placeholder="Search by review"
            />
      </div>
            </div>
    </>
  );
};