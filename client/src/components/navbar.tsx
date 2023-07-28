import { useState, useEffect, FC } from "react";
import { Navbar, Text, Image, Dropdown, Avatar, Grid } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import Link from "next/link";

const NavbarComp = () => {
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
          href="/dashboard"
          className="font-poppins text-[25px] font-[400]"
        >
          DASHBOARD
        </Navbar.Link>
        <Navbar.Link
          color="primary"
          href="/mentee-dashboard"
          className="font-poppins text-[25px] font-[400]"
        >
          JOURNAL
        </Navbar.Link>
        <Navbar.Link
          color="primary"
          href="/feedpage"
          className="font-poppins text-[25px] font-[400]"
        >
          RESOURCES
        </Navbar.Link>
        <Navbar.Item>
          <Grid>
            <Dropdown placement="bottom-left">
              <Dropdown.Trigger>
                <Avatar
                  bordered
                  size="lg"
                  as="button"
                  color="secondary"
                  src="default.jpeg"
                />
              </Dropdown.Trigger>
              <Dropdown.Menu color="secondary" aria-label="Avatar Actions">
                <Dropdown.Item key="settings">
                  <Link href="/settings">Edit Profile</Link>
                </Dropdown.Item>
                <Dropdown.Item key="logout" color="error" withDivider>
                  <Link href="/signin">Log Out</Link>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Grid>
        </Navbar.Item>
      </Navbar.Content>
    </Navbar>
  );
};

export default NavbarComp;
