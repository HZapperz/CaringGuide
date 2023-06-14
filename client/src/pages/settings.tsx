import Nav from "./components/nav1";
import { Navbar, Text, Image, Button, Input, User, Dropdown, Avatar, Grid, Container, Row, Col, Card, Spacer, Textarea } from "@nextui-org/react";
import Link from "next/link";

const SettingsPage = () => {
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
          <Navbar.Link color="primary" href="/settings">
            RESOURCES
          </Navbar.Link>
          <Navbar.Link color="primary" href="/settings">
            DASHBOARD
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
                    Edit Profile
                  </Dropdown.Item>
                  <Dropdown.Item key="logout" color="error" withDivider>
                    Log Out
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Grid>

          </Navbar.Item>
        </Navbar.Content>
      </Navbar>
      <section>
        <div className="relative">
          <div className="h-72">
            <div className="h-36 w-full bg-gradient-to-r from-green-100 to-pink-200"></div>
            <img className="absolute top-24 left-20 w-36 h-36 p-0 rounded-full ring-4 ring-gray-300 dark:ring-gray-500" src="default.jpeg" />
            <div className="pr-48 pt-12 flex md:flex md:flex-grow flex-row justify-end space-x-1">
              <button className="text-sm w-24 bg-green-900 border-2 hover:bg-green-800 text-white py-2 px-4 rounded-lg border-green-900">
                Save
              </button>
              <Spacer x={2} />
              <button className="w-24 text-sm rounded-lg bg-transparent text-gray-800 hover:bg-gray-200 hover:border-transparent py-2 px-4 border-2 border-gray-300 rounded">
                Cancel
              </button>
            </div>

          </div>
        </div>
      </section>

      <section>
        <Container gap={0} css={{ d: 'flex', flexWrap: 'nowrap' }}>
          <Spacer x={12} />
          <Text size={15}>First Name</Text>
          <Spacer x={5} />
          <Input bordered size="sm" placeholder="First Name" color="secondary" />
        </Container>
        <Spacer y={0.5} />
        <div className="relative flex py-5 items-center">
          <div className="flex-grow border-t border-gray-300"></div>
        </div>
        <Spacer y={0.5} />
        <Container gap={0} css={{ d: 'flex', flexWrap: 'nowrap' }}>
          <Spacer x={12} />
          <Text size={15}>Middle Name</Text>
          <Spacer x={4.3} />
          <Input bordered size="sm" placeholder="Middle Name" color="secondary" />
        </Container>
        <Spacer y={0.5} />
        <div className="relative flex py-5 items-center">
          <div className="flex-grow border-t border-gray-300"></div>
        </div>
        <Spacer y={0.5} />
        <Container gap={0} css={{ d: 'flex', flexWrap: 'nowrap' }}>
          <Spacer x={12} />
          <Text size={15}>Last Name</Text>
          <Spacer x={5} />
          <Input bordered size="sm" placeholder="Last Name" color="secondary" />
        </Container>
        <Spacer y={0.5} />
        <div className="relative flex py-5 items-center">
          <div className="flex-grow border-t border-gray-300"></div>
        </div>
        <Spacer y={0.5} />
        <Container gap={0} css={{ d: 'flex', flexWrap: 'nowrap' }}>
          <Spacer x={12} />
          <Text size={15}>Age</Text>
          <Spacer x={7} />
          <Input bordered size="sm" placeholder="Age" color="secondary" />
        </Container>
        <Spacer y={0.5} />
        <div className="relative flex py-5 items-center">
          <div className="flex-grow border-t border-gray-300"></div>
        </div>
        <Spacer y={0.5} />
        <Container gap={0} css={{ d: 'flex', flexWrap: 'nowrap' }}>
          <Spacer x={12} />
          <Text size={15}>Location</Text>
          <Spacer x={5.7} />
          <Input bordered size="sm" placeholder="City" color="secondary" />
          <Spacer x={4} />
          <Text size={15}>State</Text>
          <Spacer x={3} />
          <Input bordered width="120px" size="sm" placeholder="State" color="secondary" />
        </Container>
        <Spacer y={0.5} />
        <div className="relative flex py-5 items-center">
          <div className="flex-grow border-t border-gray-300"></div>
        </div>
        <Spacer y={0.5} />
        <Container gap={0} css={{ d: 'flex', flexWrap: 'nowrap' }}>
          <Spacer x={12} />
          <Text size={15}>Your Bio</Text>
          <Spacer x={5.7} />
          <Textarea
            bordered
            color="secondary"
            width="500px"
          />
        </Container>
        <Spacer y={3} />
      </section>

    </>
  );
};

export default SettingsPage;