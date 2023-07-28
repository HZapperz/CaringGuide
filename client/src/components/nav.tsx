import { useState, useEffect, FC } from "react";
import { Navbar, Text, Image, Button } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import Link from "next/link";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";

const Nav = () => {
<<<<<<< HEAD
  const user = useUser();
  const supabase = useSupabaseClient();
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

=======
>>>>>>> 73d4abf4e5ee86f80b93722301ab307277408d07
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
<<<<<<< HEAD
      <Navbar.Content hideIn="xs" variant="underline">
        <Navbar.Link
          activeColor="secondary"
          isActive={activeLink === "section-1"}
          color="primary"
          onClick={handleScrollToSection1}
        >
          <p className=" text-bold relative group">
            <span className="">Section 1</span>
            <span className="absolute -bottom-1 left-0 w-0 h-1 bg-caring transition-all group-hover:w-full"></span>
          </p>
        </Navbar.Link>
        <Navbar.Link
          activeColor="secondary"
          isActive={activeLink === "section-2"}
          color="primary"
          onClick={handleScrollToSection2}
        >
          Section 2
        </Navbar.Link>
      </Navbar.Content>
      {user ? (
        <Navbar.Content>
          <Navbar.Item>
            <Link href="/dashboard">
              <Button flat color="secondary" auto href="#">
                Dashboard
              </Button>
            </Link>
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
      )}
=======
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
>>>>>>> 73d4abf4e5ee86f80b93722301ab307277408d07
    </Navbar>
  );
};

export default Nav;
