import { TextInput, Center } from "@mantine/core";

export const ActivityReviewSearch = ({ reviewSetterFunction, descriptionSetterFunction }) => {
  return (
    <>
    
      <Center>
        <TextInput
          onChange={(changeEvent) => {
              descriptionSetterFunction(changeEvent.target.value);
            }}
            type="text"
            placeholder="Search by description"
            />    
        <TextInput
          onChange={(changeEvent) => {
              reviewSetterFunction(changeEvent.target.value);
            }}
            type="text"
            placeholder="Search by review"
            />
      </Center>
    </>
  );
};