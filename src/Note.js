import { Card, Text, Button, Flex } from "@aws-amplify/ui-react";

const Note = ({ name, description, onDelete }) => {
  return (
    <Card
      width="300px"
      padding="1rem"
      boxShadow="rgba(0, 0, 0, 0.1) 0px 4px 12px"
    >
      <Flex
        direction="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Text as="h3" fontWeight={700} margin="0">
          {name}
        </Text>
        <Button variation="link" onClick={onDelete}>
          Delete note
        </Button>
      </Flex>
      <Text>{description}</Text>
    </Card>
  );
};

export default Note;
