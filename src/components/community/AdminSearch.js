import { TextInput, Center } from "@mantine/core";

// This component is responsible for rendering the Search Bar
export const AdminReviewSearch = ({
  reviewSetterFunction
}) => {
  return (
    <>
      <Center>
        <TextInput
          onChange={(changeEvent) => {
            reviewSetterFunction(changeEvent.target.value);
          }}
          type="text"
          placeholder="Search By Review"
        />
      </Center>
    </>
  );
};
