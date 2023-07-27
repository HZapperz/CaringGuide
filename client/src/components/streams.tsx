import { useState, useEffect, FC } from "react";
import { Navbar, Text, Image, Button } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import Link from "next/link";



const Streams = () => {
 
    return (
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
        <Text
          h2
          weight="bold"
          css={{
            textGradient: "45deg, $green900 -10%, $red800 50%",
          }}
        >
          Streams
        </Text>
      </Navbar.Brand>
      <Navbar.Content hideIn="xs" variant="underline">
      <Navbar.Item>
        <Link href="/articles"> {/* link to components for page */}
          <Button
           flat color="secondary"
           auto href="#" 
          > 
            Physical
          </Button>
          </Link>
        </Navbar.Item>
        <Navbar.Item>
        <Link href="/articles"> {/* link to components for page */}
          <Button flat color="secondary" auto href="#" >
            Mental
          </Button>
          </Link>
        </Navbar.Item>
        <Navbar.Item>
        <Link href="/articles"> {/* link to components for page */}
          <Button flat color="secondary" auto href="#" >
            Financial
          </Button>
          </Link>
        </Navbar.Item>
        <Navbar.Item>
        <Link href="/articles"> {/* link to components for page */}
          <Button flat color="secondary" auto href="#" >
            Informal
          </Button>
          </Link>
        </Navbar.Item>
        <Navbar.Item>
        <Link href="/articles"> {/* link to components for page */}
          <Button flat color="secondary" auto href="#" >
            Palliative Care
          </Button>
          </Link>
        </Navbar.Item>
        <Navbar.Item>
        <Link href="/articles"> {/* link to components for page */} 
          <Button flat color="secondary" auto href="#" >
            General
          </Button>
          </Link>
        </Navbar.Item>
      </Navbar.Content>
      <Navbar.Content>
        
      </Navbar.Content>
    </Navbar>
        </>
    );
    
};
export default Streams;


