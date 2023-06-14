import React, { useState, useEffect } from "react";
import { Navbar, Text, Image, Button } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import Link from "next/link";

const Nav = () => {
  const [activeLink, setActiveLink] = useState("");
  const [buttonSize, setButtonSize] = useState({ width: 65, height: 38 });
  const [loginSize, setLoginSize] = useState({ width: 95, height: 30 });

  useEffect(() => {
    // Function to handle scroll event
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

    // Add scroll event listener
    window.addEventListener("scroll", handleScroll);

    // Clean up the scroll event listener
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Scroll to section 1
  const handleScrollToSection1 = () => {
    const section1 = document.getElementById("section-1");
    if (section1) {
      window.scrollTo({
        top: section1.offsetTop - 90,
        behavior: "smooth",
      });
    }
  };

  // Scroll to section 2
  const handleScrollToSection2 = () => {
    const section2 = document.getElementById("section-2");
    if (section2) {
      window.scrollTo({
        top: section2.offsetTop - 90,
        behavior: "smooth",
      });
    }
  };

  const buttonStyle = {
    backgroundColor: "rgb(13, 71, 53)",
    borderRadius: "8px",
    width: `${buttonSize.width}px`,
    height: `${buttonSize.height}px`,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  const loginButtonStyle = {
    border: "2px solid rgb(13, 71, 53)",
    borderRadius: "8px",
    padding: "2px",
    width: `${loginSize.width}px`,
    height: `${loginSize.height}px`,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginRight: "8px",
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
      {/* Left content */}
      <Navbar.Content align="left">
        <Navbar.Brand style={{ display: "flex", alignItems: "center" }}>
          <Image src="/logo.png" alt="Logo" width={50} height={50} />
          <Text
            h2
            weight="bold"
            css={{
              textShadow: "0 0 8px rgba(0, 0, 0, 0.3)",
              lineHeight: "5",
              fontSize: "1.5rem",
            }}
          >
            <span style={{ color: "rgb(13, 71, 53)" }}>Caring </span>
            <span style={{ color: "rgb(171, 29, 65)" }}>Guide</span>
          </Text>
        </Navbar.Brand>
      </Navbar.Content>

      {/* Right content */}
      <Navbar.Content align="right" className="flex items-center">
        <Text
          className={`mr-2 ${activeLink === "section-1" ? "font-bold" : ""}`}
          onClick={handleScrollToSection1}
          style={{
            color: "rgb(170, 0, 0)",
            cursor: "pointer",
          }}
        >
          HOME
        </Text>
        <Text
          className={`mr-2 ${activeLink === "section-2" ? "font-bold" : ""}`}
          color="primary"
          onClick={handleScrollToSection2}
          style={{ cursor: "pointer" }}
        >
          ABOUT US
        </Text>
        <Navbar.Link color="primary" href="/signin" className="font-bold">
          <div style={loginButtonStyle}>
            <span style={{ color: "rgb(13, 71, 53)" }}>LOG IN</span>
          </div>
        </Navbar.Link>
        <Navbar.Item>
          <Link href="/signup">
            <Button flat color="secondary" auto style={buttonStyle}>
              <Text color="white">SIGN UP</Text>
            </Button>
          </Link>
        </Navbar.Item>
      </Navbar.Content>
    </Navbar>
  );
};

export default Nav;
