import { Navbar, Text, Image, Button } from "@nextui-org/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import Caregiver from "../components/caregiver";
import Guide from "../components/guide";
import { Role } from "@prisma/client";
import { useRouter } from "next/router";
import { useApp } from "@/context/app";
import Loader from "@/components/loader";

const OnBoarding = () => {
  const [role, setRole] = useState<Role>(Role.MENTEE);
  const { profile, isLoading, session } = useApp();
  const router = useRouter();
  const { logout } = useApp();

  useEffect(() => {
    if (isLoading) return;

    if (!session) {
      router.replace("/signin");
      return;
    }

    if (!!profile && profile.role === "ADMIN") {
      router.replace("/admin/accounts");
      return;
    }

    if (!!profile) {
      router.replace("/dashboard");
      return;
    }
  }, [isLoading, session, profile]);

  if (isLoading || !session || profile) return <Loader />;

  const handleLogout = async () => {
    await logout();
  };

  return (
    <>
      <Navbar
        isBordered
        variant="sticky"
        maxWidth="fluid"
        css={{
          $$navbarBackgroundColor: "rgba(12, 69, 27, 0.4)",
          $$navbarBlurBackgroundColor: "rgba(12, 69, 27, 0.4)",
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

        <Navbar.Content>
          <Navbar.Item>
            <Button flat color="error" auto onClick={handleLogout}>
              Log Out
            </Button>
          </Navbar.Item>
        </Navbar.Content>
      </Navbar>
      <div className="p-2 bg-white md:p-16">
        <div className="flex items-center justify-around mb-8">
          <div
            onClick={() => {
              setRole("MENTEE");
            }}
            className={
              "w-full max-w-[400px] h-56 p-8 text-center border-2 rounded-2xl flex flex-col justify-center items-center cursor-pointer mr-2 md:mr-10" +
              (role === "MENTEE"
                ? " border-2 border-caring"
                : " border-2 border-inactive")
            }
          >
            <h1 className="font-poppins text-3xl font-[400] text-[#4E4E4E] mb-4">
              I am a Caregiver
            </h1>
          </div>
          <div
            onClick={() => {
              setRole("MENTOR");
            }}
            className={
              "w-full max-w-[400px] h-56 p-8 text-center border-2 rounded-2xl flex flex-col justify-center items-center cursor-pointer" +
              (role === "MENTOR"
                ? " border-2 border-caring"
                : " border-2 border-inactive")
            }
          >
            <h1 className="font-poppins text-3xl font-[400] text-[#4E4E4E] mb-4">
              I am a Guide
            </h1>
          </div>
        </div>
        <hr />
        {role === "MENTEE" ? <Caregiver /> : <Guide />}
      </div>
    </>
  );
};

export default OnBoarding;
