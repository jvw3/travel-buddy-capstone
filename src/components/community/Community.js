import { Blockquote, Group, Card, Text} from "@mantine/core";
import "./community.css";
import { IconArrowBigRightLines } from "@tabler/icons";

export const CommunityPage = () => {
  
  
  
    return (
      <>
        <Blockquote>
          A journey well shared is a journey well enjoyed.
        </Blockquote>
        <Group grow>
          <Card className="communitycard" withBorder>
            <Text>Travel</Text>
          </Card>
          <Card className="communitycard" withBorder>
            <Text>Review</Text>
          </Card>
          <Card className="communitycard" withBorder>
            <Text>Share</Text>
          </Card>
        </Group>
      </>
    );
};
