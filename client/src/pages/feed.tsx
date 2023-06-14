import Nav from "./components/nav1";
import Streams from "./components/streams";
import { Navbar, Text, Image, Button, Input } from "@nextui-org/react";
import Link from "next/link";
import Articles from "./components/articles";

const FeedPage = () => {
    return(
        <>
        <Navbar
      isBordered
      variant="sticky"
      maxWidth="fluid"
      css={{
        $$navbarBackgroundColor: "#FFFFFF80",
        $$navbarBlurBackgroundColor: "#FFFFFF80",
      }}
    >
      <Navbar.Brand>
        <Image src="/logo.png" alt="Logo" width={40} height={40} />
        <Text
          h2
          weight="bold"
          css={{
            textGradient: "45deg, $green900 -10%, $red800 50%",
          }}
        >
          Caring Guide
        </Text>
      </Navbar.Brand>
      <Input
              clearable
              
              contentLeftStyling={false}
              css={{
                w: "90%",
                "@xs": {
                  mw: "800px",
                },
                "& .nextui-input-content--left": {
                  h: "100%",
                  ml: "$4",
                  dflex: "center",
                },
              }}
              placeholder="Search..."
            />
      
      <Navbar.Content>
        <Navbar.Link color="primary" href="/feed">
            Feed
        </Navbar.Link>
        <Navbar.Link color="primary" href="/signin">
          Login
        </Navbar.Link>
        <Navbar.Item>
        <Link href="/signup">
          <Button flat color="secondary" auto href="#" >
            Sign Up
          </Button>
          </Link>
        </Navbar.Item>
      </Navbar.Content>
    </Navbar>
        <Streams />
        <Articles /> 
        
        

        </>
    );
};

export default FeedPage;