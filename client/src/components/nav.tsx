import { Navbar, Text, Image, Button } from "@nextui-org/react";
import Link from "next/link";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import { useState, useEffect } from 'react';

const Nav = () => {
  const user = useUser();
  const supabase = useSupabaseClient();
  const router = useRouter();
  const [showNav, setShowNav] = useState(true);

  useEffect(() => {
    const excludedRoutes = ["/signin", "/signup", "/terms-of-use", "/privacy-policy"];
    setShowNav(!excludedRoutes.includes(router.pathname));
  }, [router.pathname]);

  if (!showNav) {
    return null;
  }

  return (
    <Navbar
      isBordered
      variant="sticky"
      maxWidth="fluid"
      css={{
        $$navbarBackgroundColor: "rgba(240, 240, 240, 0.7)",
        $$navbarBlurBackgroundColor: "rgba(240, 240, 240, 0.7)",
      }}
    >
      <Navbar.Brand
        onClick={() => (window.location.href = "/")}
        className="cursor-pointer"
      >
        <Text
          h2
          weight="bold"
          css={{
            textGradient: "45deg, $green900 -10%, $red800 50%",
          }}
        >
          CaringGuide
        </Text>
        <Image src="/logo.png" alt="Logo" width={40} height={40} />
      </Navbar.Brand>
      {user ? (
        <Navbar.Content>
          <Button flat color="secondary" href="/dashboard" as={Link}>
            Dashboard
          </Button>
          <Button
            color="primary"
            className="relative inline-block font-bold transition-colors duration-300 text-black"
            onClick={() => supabase.auth.signOut()}
          >
            <p className=" text-bold relative group">
              <span className="">Logout</span>
              <span className="absolute -bottom-1 left-0 w-0 h-1 bg-caring transition-all group-hover:w-full"></span>
            </p>
          </Button>
        </Navbar.Content>
      ) : (
        <Navbar.Content>
          <Navbar.Link
            color="primary"
            href="/signin"
            as={Link}
            className="relative inline-block font-bold transition-colors duration-300 text-black"
          >
            <p className=" text-bold relative group">
              <span className="">Log In</span>
              <span className="absolute -bottom-1 left-0 w-0 h-1 bg-caring transition-all group-hover:w-full"></span>
            </p>
          </Navbar.Link>
          <Navbar.Item as={Link} href={"/signup"}>
            <Button flat color="secondary" auto href="#">
              Sign Up
            </Button>
          </Navbar.Item>
        </Navbar.Content>
      )}
    </Navbar>
  );
};

export default Nav;
