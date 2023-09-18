import { useState, useEffect } from "react";
import { Navbar, Text, Image, Dropdown, Avatar, Grid } from "@nextui-org/react";
import { Bars3Icon } from "@heroicons/react/20/solid";
import Link from "next/link";
import { useRouter } from "next/router";
import { useApp } from "@/context/app";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import useHandleErrors from "@/hooks/useHandleErrors";

const NavbarComp = () => {
  const router = useRouter();
  const data = useApp();
  const profile = data.profile!;
  const supabase = useSupabaseClient();
  const handleErrors = useHandleErrors();
  const [avatar, setAvatar] = useState<string | null>(profile?.avatar);

  useEffect(() => {
    (async () => {
      try {
        if (!profile.avatar) return;

        const { data, error } = await supabase.storage
          .from("avatars")
          .download(profile.avatar);
        if (error) {
          throw error;
        }

        const url = URL.createObjectURL(data);
        setAvatar(url);
      } catch (error) {
        handleErrors(error);
      }
    })();
  }, [profile?.avatar]);

  if (
    router.pathname.includes("/admin") ||
    router.pathname.includes("/onboarding") ||
    router.pathname.includes("/welcome")
  ) {
    return null;
  }

  return (
    <Navbar
      isBordered
      variant="sticky"
      maxWidth="fluid"
      css={{
        $$navbarBackgroundColor: "#f0f0f0", 
        $$navbarBlurBackgroundColor: "#f0f0f0",
      }}
    >
      <Navbar.Brand
        onClick={() => (window.location.href = "/dashboard")}
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

      <div className="hidden lg:block">
        <Navbar.Content>
          <Navbar.Item>
            <Grid>
              <Dropdown placement="bottom-left">
                <Dropdown.Trigger>
                  {avatar ? (
                    <Avatar
                      bordered
                      size="lg"
                      as="button"
                      color="secondary"
                      src={avatar}
                    />
                  ) : (
                    <Avatar
                      bordered
                      size="lg"
                      as="button"
                      color="secondary"
                      src="default.jpeg"
                    />
                  )}
                </Dropdown.Trigger>
                <Dropdown.Menu
                  color="secondary"
                  aria-label="Avatar Actions"
                  onAction={(key) =>
                    key === "logout" && supabase.auth.signOut()
                  }
                >
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
      </div>
      <div className="block lg:hidden">
        <Navbar.Content>
          <Navbar.Item>
            <Grid>
              <Dropdown placement="bottom-left">
                <Dropdown.Trigger>
                  <div className="w-8 cursor-pointer border-2 border-caring rounded-full p-2">
                    <Bars3Icon />
                  </div>
                </Dropdown.Trigger>
                <Dropdown.Menu color="secondary" aria-label="Avatar Actions">
                  <Dropdown.Item key="dashboard" color="secondary">
                    <Link href="/dashboard">DASHBOARD</Link>
                  </Dropdown.Item>
                  <Dropdown.Item key="journal" color="secondary">
                    <Link href="/journal">JOURNAL</Link>
                  </Dropdown.Item>
                  <Dropdown.Item key="resources" color="secondary">
                    <Link href="/resources">RESOURCES</Link>
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Grid>
          </Navbar.Item>
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
                <Dropdown.Menu
                  color="secondary"
                  aria-label="Avatar Actions"
                  onAction={(key) =>
                    key === "logout" && supabase.auth.signOut()
                  }
                >
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
      </div>
    </Navbar>
  );
};

export default NavbarComp;
