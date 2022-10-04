import { TextInput, Center } from "@mantine/core";

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
