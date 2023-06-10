import Nav from "./components/nav";
import Streams from "./components/streams";
import {
  Navbar,
  Text,
  Image,
  Button,
  Input,
  Grid,
  Container,
  Card,
} from "@nextui-org/react";
import Link from "next/link";
import Articles from "./components/articles";
import art from "../pages/api/links";

import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const Feed = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

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
        <Input
          clearable
          contentLeftStyling={false}
          css={{
            w: "90%",
            "@xs": {
              mw: "800px",
            },
            "& .nextui-input-content--left": {
              h: "100%",
              ml: "$4",
              dflex: "center",
            },
          }}
          placeholder="Search..."
        />

        <Navbar.Content>
          <Navbar.Link color="primary" href="/feed">
            Feed
          </Navbar.Link>
          <Navbar.Link color="primary" href="/signin">
            Login
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

      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="Item One" {...a11yProps(0)} />
            <Tab label="Item Two" {...a11yProps(1)} />
            <Tab label="Item Three" {...a11yProps(2)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          Item One
        </TabPanel>
        <TabPanel value={value} index={1}>
          Item Two
        </TabPanel>
        <TabPanel value={value} index={2}>
          Item Three
        </TabPanel>
      </Box>

      <div className="max-w-screen-5xl grid grid-cols-2 p-8">
        {art.map((val, index) => {
          return (
            <a
              href="#"
              className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-4xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
            >
              <Image src={val.imgsrc} className="object-cover w-12 h-12" />
              <div className="flex flex-col justify-between p-4 leading-normal">
                <Text
                  h5
                  className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
                >
                  {val.title}
                </Text>
                <Text className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                  {val.text}
                </Text>
              </div>
            </a>
          );
        })}
      </div>
    </>
  );
};

export default Feed;
