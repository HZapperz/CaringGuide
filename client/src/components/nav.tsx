import { Navbar, Text, Image, Button } from "@nextui-org/react";
import Link from "next/link";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";

const Nav = () => {
  const user = useUser();
  const supabase = useSupabaseClient();

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
      <Navbar.Brand
        onClick={() => (window.location.href = "/")}
        className="cursor-pointer"
      >
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
      {user ? (
        <Navbar.Content>
          <Navbar.Item as={Link} href="/dashboard">
            <Button flat color="secondary" auto href="#">
              Dashboard
            </Button>
          </Navbar.Item>
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
              <span className="">Login</span>
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
