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
  Checkbox,
  Spacer,
} from "@nextui-org/react";
import Link from "next/link";
import Articles from "./components/articles";
import links from "./links";

import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import { useState } from "react";
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';


const feedpage = () => {
  const [value, setValue] = React.useState(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  const a11yProps = (index: number) => {
    return {
      id: `tab-${index}`,
      "aria-controls": `tabpanel-${index}`,
    };
  };
  const tabLabels = [
    "general",
    "finances",
    "eol",
    "informal",
    "physical",
    "emotion",
  ];

  const [selected, setSelected] = useState<string[]>([]);
  const handleButtonClick = (value: string) => {
    if (selected.includes(value)) {
      setSelected(selected.filter((item) => item !== value));
    } else {
      setSelected([...selected, value]);
    }
  };

  const [isStarred, setIsStarred] = useState(false);

  const handleStarClick = (e: React.MouseEvent<SVGElement, MouseEvent>) => {
    e.preventDefault();
    setIsStarred(!isStarred);
  };

  // const [isFavorite, setIsFavorite] = useState(false);

  // const handleStarClick = () => {
  //   setIsFavorite(!isFavorite);
  // };

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

      {/* <Box component="span" sx={{ display: "flex" }}> */}
      <Box component="span" className="flex w-full">
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          centered={true}
          className="w-full"
          sx={{
            "& .MuiTabs-indicator": {
              backgroundColor: "#0E4735",
            },
          }}
        >
          <Tab
            label="GENERAL INFO"
            {...a11yProps(0)}
            sx={{
              fontWeight: "bold",
              "&.Mui-selected": {
                color: "#0E4735",
              },
            }}
          />
          <Tab
            label="FINANCES"
            {...a11yProps(1)}
            sx={{
              fontWeight: "bold",
              "&.Mui-selected": {
                color: "#0E4735",
              },
            }}
          />
          <Tab
            label="END-OF-LIFE/GREIF"
            {...a11yProps(2)}
            sx={{
              fontWeight: "bold",
              "&.Mui-selected": {
                color: "#0E4735",
              },
            }}
          />
          <Tab
            label="INFORMAL"
            {...a11yProps(3)}
            sx={{
              fontWeight: "bold",
              "&.Mui-selected": {
                color: "#0E4735",
              },
            }}
          />
          <Tab
            label="PHYSICAL CARE"
            {...a11yProps(4)}
            sx={{
              fontWeight: "bold",
              "&.Mui-selected": {
                color: "#0E4735",
              },
            }}
          />
          <Tab
            label="EMOTIONS"
            {...a11yProps(5)}
            sx={{
              fontWeight: "bold",
              "&.Mui-selected": {
                color: "#0E4735",
              },
            }}
          />
        </Tabs>
      </Box>

      <div className="flex justify-center p-6 space-x-4">
        {[
          "Scientific Journal",
          "Support Group",
          "Non-Profit",
          "Product",
          "Website",
          "Article",
        ].map((label) => (
          <button
            key={label}
            className={`checkbox-button ${selected.includes(label) ? "selected" : ""
              }`}
            onClick={() => handleButtonClick(label)}
          >
            {label}
            {selected.includes(label) ? " x  " : "  +  "}
          </button>
        ))}
        <style jsx>{`
          .checkbox-button {
            display: inline-flex;
            padding: 8px 16px;
            border: 1px solid #ccc;
            border-radius: 16px;
            background-color: transparent;
            cursor: pointer;
            transition: background-color 0.3s;
            position: relative;
          }

          .checkbox-button.selected {
            border: 2px solid #0e4735;
            color: #0e4735;
          }

          .button-icon {
            position: absolute;
            top: 50%;
            right: 12px;
            transform: translateY(-50%);
            font-weight: bold;
            font-size: 16px;
            line-height: 1;
          }
        `}</style>
      </div>

      <div className="max-w-screen-5xl grid grid-cols-2 gap-4 p-8">
        {links.map((val, ind) => {
          if (selected.includes(val.sub) && val.category === tabLabels[value]) {
            return (
              <a
                href={val.link}
                className="relative flex flex-col items-center bg-white border-2 border-gray-200 rounded-2xl md:flex-row md:max-w-4xl hover:bg-gray-100 dark:border-gray-700 dark:bg-white dark:hover:bg-gray-700"
                target="_blank"
                rel="noopener noreferrer"
                key={ind}
              >
                <img

                  className="object-cover p-2 rounded-2xl h-48 w-48"
                  src={val.imgsrc}
                  alt="image"
                />
                <div className="flex flex-col justify-between p-4 leading-normal">
                  <h5 className="-mt-4 text-2xl text-gray-500 font-semibold tracking-tight dark:text-gray-500">
                    {val.title}
                  </h5>
                  <h5 className="mb-2 text-lg text-gray-500 font-normal tracking-tight dark:text-gray-500">
                    {val.sub}
                  </h5>
                  <p className="text-sm font-normal text-gray-400 dark:text-gray-400">
                    {val.text}
                  </p>
                </div>
                <div className="absolute bottom-1 right-1">
                  {isStarred ? (
                    <StarIcon
                      className="h-10 w-10 text-green-800 cursor-pointer"
                      onClick={handleStarClick}
                    />
                  ) : (
                    <StarBorderIcon
                      className="h-10 w-10 text-gray-500 cursor-pointer"
                      onClick={handleStarClick}
                    />
                  )}
                </div>

              </a>
            );
          }
          return null;
        })}
      </div>



    </>
  );
};

export default feedpage;
