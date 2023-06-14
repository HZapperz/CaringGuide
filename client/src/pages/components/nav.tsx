import React, { useState, useEffect } from "react";
import { Navbar, Text, Image, Button } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import Link from "next/link";

const Nav = () => {
  const [activeLink, setActiveLink] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      const section1 = document.getElementById("section-1");
      const section2 = document.getElementById("section-2");
      if (section1 && window.scrollY < section1.offsetTop - 100) {
        setActiveLink("");
      } else if (section2 && window.scrollY >= section2.offsetTop - 100) {
        setActiveLink("section-2");
      } else {
        setActiveLink("section-1");
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleScrollToSection1 = () => {
    const section1 = document.getElementById("section-1");
    if (section1) {
      window.scrollTo({
        top: section1.offsetTop - 90,
        behavior: "smooth",
      });
    }
  };

  const handleScrollToSection2 = () => {
    const section2 = document.getElementById("section-2");
    if (section2) {
      window.scrollTo({
        top: section2.offsetTop - 90,
        behavior: "smooth",
      });
    }
  };

  return (
    <Navbar
      isBordered
      variant="sticky"
      maxWidth="fluid"
      css={{
        $$navbarBackgroundColor: "#FFFFFF80",
        $$navbarBlurBackgroundColor: "#FFFFFF80",
      }}
    >
      <Navbar.Content align="left">
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
      </Navbar.Content>
      <Navbar.Content align="right">
        <Text className="mr-10" color="red" className="font-bold">
          HOME
        </Text>
        <Text className="mr-10" color="primary" className="font-bold">
          ABOUT US
        </Text>
        <Navbar.Link color="primary" href="/signin" className="font-bold">
          <Text color="primary">LOGIN</Text>
        </Navbar.Link>
        <Navbar.Item>
          <Link href="/signup">
            <Button flat color="secondary" auto>
              SIGN UP
            </Button>
          </Link>
        </Navbar.Item>
      </Navbar.Content>
    </Navbar>
  );
};

export default Nav;