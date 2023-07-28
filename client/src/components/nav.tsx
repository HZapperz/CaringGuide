import { useState, useEffect, FC } from "react";
import { Navbar, Text, Image, Button } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import Link from "next/link";

const Nav = () => {
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
      <Navbar.Content>
        <Navbar.Link
          color="primary"
          href="/signin"
          className="relative inline-block font-bold transition-colors duration-300 text-black"
        >
          <p className=" text-bold relative group">
            <span className="">Login</span>
            <span className="absolute -bottom-1 left-0 w-0 h-1 bg-caring transition-all group-hover:w-full"></span>
          </p>
        </Navbar.Link>
        <Navbar.Item>
          <Link href="/signup">
            <Button flat color="secondary" auto href="#">
              Sign Up
            </Button>
          </Link>
        </Navbar.Item>
      </Navbar.Content>
    </Navbar>
  );
};

export default Nav;
