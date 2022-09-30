import { Button } from "@mantine/core"
import { IconBrandTwitter, IconBrandLinkedin, IconBrandGithub } from "@tabler/icons";
import "./footer.css";

export const Footer = () => {



    return (
      <>
        <footer className="footersection">
          <Button color="violet" compact radius="xl" size="xs" variant="subtle">
            <IconBrandGithub />
          </Button>
          <Button color="violet" compact radius="xl" size="xs" variant="subtle">
            <IconBrandLinkedin />
          </Button>
          <Button color="violet" compact radius="xl" size="xs" variant="subtle">
            <IconBrandTwitter />
          </Button>
        </footer>
      </>
    );
}