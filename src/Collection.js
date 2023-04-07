import React from "react";
import { Card, Grid, Heading, Text, Button } from "@aws-amplify/ui-react";

const MyCollection = ({ data, onDelete }) => {
  return (
    <div>
      <Heading level={2} style={{ color: 'var(--primary-color)' }}>Things to Do &#127881;</Heading>
      <Grid gap={4} columns={[1, 2, 3]}>
        {data.map((item) => (
          <Card
            key={item.id}
            variation="elevated"
            padding={4}
            style={{ minHeight: 200 }}
          >
            <Heading level={2} style={{ marginBottom: 0 }}>
              {item.name}
            </Heading>
            <Text>{item.description}</Text>
            <Button
              variation="primary"
              style={{ marginTop: "auto" }}
              onClick={() => onDelete(item.id)}
            >
              Delete note
            </Button>
          </Card>
        ))}
      </Grid>
    </div>
  );
};

export default Collection;
