import React from "react";
import { Text, Image, Col, Card, Grid, Link } from "@nextui-org/react";
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";
import GroupsIcon from "@mui/icons-material/Groups";
import ScheduleIcon from "@mui/icons-material/Schedule";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import PsychologyAltIcon from "@mui/icons-material/PsychologyAlt";
import GppGoodIcon from "@mui/icons-material/GppGood";
import LibraryAddIcon from "@mui/icons-material/LibraryAdd";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

import Nav from "./components/nav";
import trust from "../../public/homeimgs/trust.png";
import resources from "../../public/homeimgs/resources.png";
import connect from "../../public/homeimgs/connect.png";

import logo from "../../public/images/Caring-Guide-logo-horiz-color.png";
import { SocialIcon } from "react-social-icons";

import { Fragment, useState } from "react";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";

function Icon({ id, open }: { id: any; open: any }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={`${
        id === open ? "rotate-180" : ""
      } h-5 w-5 transition-transform`}
      fill="none"
      viewBox="0 24 30 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  );
}
// red: #ab1d41
// green: #0e4735

const landing = () => {
  const [open, setOpen] = useState(1);

  const handleOpen = (value: any) => {
    setOpen(open === value ? 0 : value);
  };

  return (
    <>
      <Nav />
      <div className="bg-white">
        <div
          className="bg-cover bg-center rounded-lg h-auto text-white py-24 px-10 object-fill"
          style={{ backgroundImage: "url(/images/whistler-hike.jpeg)" }}
        >
          <div className="md:w-1/2">
            <p className="text-6xl font-bold pt-10 pb-5">Foster Connections</p>
            <p className="text-6xl font-bold pb-5">Find Your Way</p>
            <p className="text-3xl mb-10 leading-none">Find a guide today</p>
            <a
              href="/signup"
              className="bg-red-800 py-4 px-8 text-white font-bold uppercase text-lg rounded hover:bg-gray-200 hover:text-gray-800"
            >
              Get Started
              <ArrowForwardIosIcon className="pl-4 h-8 w-8"></ArrowForwardIosIcon>
            </a>
          </div>
        </div>
        <section>
          <Grid.Container gap={2} justify="center" css={{ p: "$10" }}>
            <Grid
              xs
              style={{
                justifyContent: "center",
                textAlign: "center",
                alignItems: "center",
              }}
            >
              <div className="max-w-sm p-3 bg-white border border-gray-200 rounded-lg">
                <GroupsIcon
                  style={{ fill: "#0e4735" }}
                  className="h-40 w-40"
                ></GroupsIcon>
                <p className="-mt-5 mb-1 font-bold text-6xl text-red-950 dark:text-red-800">
                  41.8
                </p>
                <p className="mb-3 font-bold text-3xl text-red-950 dark:text-red-800">
                  MILLION
                </p>
                <p className="mb-3 font-medium text-gray-800 dark:text-gray-800">
                  Americans provided care to an adult over age 50 in 2020
                </p>
              </div>
            </Grid>
            <Grid
              xs
              style={{
                justifyContent: "center",
                textAlign: "center",
                alignItems: "center",
              }}
            >
              <div className="max-w-sm p-3 bg-white border border-gray-200 rounded-lg">
                <VolunteerActivismIcon
                  style={{ fill: "#0e4735" }}
                  className="h-40 w-40"
                ></VolunteerActivismIcon>
                <p className="mt-3 mb-5 font-bold text-6xl text-red-950 dark:text-red-800">
                  16.6%
                </p>
                {/* <p className="mb-3 font-bold text-3xl text-red-950 dark:text-red-800">MILLION</p> */}
                <p className="mb-3 font-medium text-gray-800 dark:text-gray-800">
                  of Americans provide care to adults with a disability or
                  illness
                </p>
              </div>
            </Grid>
            <Grid
              xs
              style={{
                justifyContent: "center",
                textAlign: "center",
                alignItems: "center",
              }}
            >
              <div className="max-w-sm p-3 bg-white border border-gray-200 rounded-lg">
                <ScheduleIcon
                  style={{ fill: "#0e4735" }}
                  className="h-36 w-36"
                ></ScheduleIcon>
                <p className="-mt-2 mb-1 font-bold text-6xl text-red-950 dark:text-red-800">
                  23.7
                </p>
                <p className="mb-3 font-bold text-3xl text-red-950 dark:text-red-800">
                  Hours Per Week
                </p>
                <p className="mb-3 font-medium text-gray-800 dark:text-gray-800">
                  on average spent providing care for loved ones not lived with
                </p>
              </div>
            </Grid>
            <Grid
              xs
              style={{
                justifyContent: "center",
                textAlign: "center",
                alignItems: "center",
              }}
            >
              <div className="max-w-sm p-3 bg-white border border-gray-200 rounded-lg">
                <PeopleOutlineIcon
                  style={{ fill: "#0e4735" }}
                  className="h-40 w-40"
                ></PeopleOutlineIcon>
                <p className="mt-3 mb-5 font-bold text-6xl text-red-950 dark:text-red-800">
                  89%
                </p>
                {/* <p className="mb-3 font-bold text-3xl text-red-950 dark:text-red-800">MILLION</p> */}
                <p className="mb-3 font-medium text-gray-800 dark:text-gray-800">
                  of caregivers provide care for a relative or another loved one
                </p>
              </div>
            </Grid>
          </Grid.Container>
        </section>
        <section>
          <Grid.Container gap={2} justify="center" css={{ pb: "$5" }}>
            <Grid xs>
              <Grid.Container gap={0.1} css={{ pl: "$10" }}>
                <Grid xs={12}>
                  <p
                    className="text-4xl font-medium"
                    style={{ color: "#0e4735" }}
                  >
                    Our Verification Process
                  </p>
                </Grid>
                <Grid xs={12}>
                  <Text h3 css={{ color: "$accents9" }}>
                    We take the safety and security of our users very seriously.
                    Thats why all of our guides go through a rigouous
                    verification process before they are officially approved.
                    This includes background checks, reference checks, and
                    personal interviews. You can rest assured that youre in good
                    hands with Caring Guide.
                  </Text>
                </Grid>
              </Grid.Container>
            </Grid>
            <Grid xs>
              <Image
                src={trust.src}
                alt="handshake"
                width={650}
                height={400}
                objectFit="cover"
                css={{
                  borderRadius: "10px",
                  overflow: "hidden",
                  height: "auto",
                }}
              />
            </Grid>
          </Grid.Container>

          <Grid.Container gap={2} justify="center">
            <Grid xs>
              <Image
                src={resources.src}
                alt="handshake"
                width={650}
                height={400}
                objectFit="cover"
                css={{ borderRadius: "10px", overflow: "hidden" }}
              />
            </Grid>
            <Grid xs>
              <Grid.Container gap={0.1} css={{ pl: "$10" }}>
                <Grid xs={12}>
                  <p
                    className="text-4xl font-medium"
                    style={{ color: "#0e4735" }}
                  >
                    Personalized Guidebook of Resources
                  </p>
                </Grid>
                <Grid xs={12}>
                  <Text h3 css={{ color: "$accents9" }}>
                    Our personalized guidebook covers a whide range of resource
                    categories, including Physical, Emotional/Mental, Financial,
                    Housing, Spritiual, End of Libe, and General. This
                    comprehensive approach ensures that caregivers have access
                    to the support they need, when they need it. Plus, our
                    mentorship program provides personalized guidance and
                    support tailored to your unique situation.
                  </Text>
                </Grid>
              </Grid.Container>
            </Grid>
          </Grid.Container>

          <Grid.Container gap={2} justify="center">
            <Grid xs>
              <Grid.Container gap={0.1} css={{ pl: "$10" }}>
                <Grid xs={12}>
                  <p
                    className="text-4xl font-medium"
                    style={{ color: "#0e4735" }}
                  >
                    Connect with a Personal Guide
                  </p>
                </Grid>
                <Grid xs={12}>
                  <Text h3 css={{ color: "$accents9" }}>
                    At Caring Guide, we understand that caregiving can be
                    overwhelming and stressful. That's why we connect caregivers
                    with a personal mentor who provides emotional and practical
                    support throughout their caregiving journey.
                  </Text>
                </Grid>
              </Grid.Container>
            </Grid>
            <Grid xs>
              <Image
                src={connect.src}
                alt="handshake"
                width={650}
                height={400}
                objectFit="cover"
                css={{ borderRadius: "10px", overflow: "hidden" }}
              />
            </Grid>
          </Grid.Container>
        </section>
        <section>
          <div
            className="bg-cover bg-center rounded-lg h-auto text-slate-800 py-24 px-10 mb-5 object-fill"
            style={{
              backgroundImage:
                "url(https://images.unsplash.com/photo-1558981806-ec527fa84c39?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80)",
            }}
          >
            <div className="flex justify-center">
              <div className="w-1/2">
                <h2 className="flex justify-center">
                  Frequently Asked Questions
                </h2>
                <Fragment>
                  <Accordion
                    open={open === 1}
                    icon={<Icon id={1} open={open} />}
                  >
                    <AccordionHeader
                      className="bg-white text-slate-800 border border-blue-gray-100 px-4 rounded-lg mb-2 "
                      onClick={() => handleOpen(1)}
                    >
                      <PsychologyAltIcon
                        style={{ fill: "#ab1d41" }}
                        className="h-8 w-8"
                      ></PsychologyAltIcon>
                      <Text size={24} weight={"medium"}>
                        How do I find the best guide for me?
                      </Text>
                    </AccordionHeader>
                    <AccordionBody className="flex justify-center bg-white text-slate-800 border border-blue-gray-100 px-4 rounded-lg mb-2 ">
                      Add text here
                    </AccordionBody>
                  </Accordion>
                  <Accordion open={open === 2}>
                    <AccordionHeader
                      className="bg-white text-slate-800 border border-blue-gray-100 px-4 rounded-lg mb-2 "
                      onClick={() => handleOpen(2)}
                    >
                      <GppGoodIcon
                        style={{ fill: "#ab1d41" }}
                        className="h-8 w-8"
                      ></GppGoodIcon>
                      <Text size={24} weight={"medium"}>
                        How are guides verified?
                      </Text>
                    </AccordionHeader>
                    <AccordionBody className="flex justify-center bg-white text-slate-800 border border-blue-gray-100 px-4 rounded-lg mb-2 ">
                      Add text here
                    </AccordionBody>
                  </Accordion>
                  <Accordion open={open === 3}>
                    <AccordionHeader
                      className="bg-white text-slate-800 border border-blue-gray-100 px-4 rounded-lg mb-2 "
                      onClick={() => handleOpen(3)}
                    >
                      <LibraryAddIcon
                        style={{ fill: "#ab1d41" }}
                        className="h-8 w-8"
                      ></LibraryAddIcon>
                      <Text size={24} weight={"medium"}>
                        How can I find more resources?
                      </Text>
                    </AccordionHeader>
                    <AccordionBody className="flex justify-center bg-white text-slate-800 border border-blue-gray-100 px-4 rounded-lg mb-2 ">
                      Add text here
                    </AccordionBody>
                  </Accordion>
                </Fragment>
              </div>
            </div>
          </div>
        </section>
        <section>
          <div className="flex justify-center pb-6">
            <p className="pt-12 text-4xl font-medium text-slate-600">
              Contact Us
            </p>
          </div>
          <div className="flex justify-center pl-12 pr-12">
            <Grid.Container gap={2} justify="center" css={{ p: "$1" }}>
              <Grid
                xs
                style={{
                  justifyContent: "center",
                  textAlign: "center",
                  alignItems: "center",
                }}
              >
                <div className="max-w-sm p-3 bg-white">
                  <Image src={logo.src} />
                  <p className="mb-3 text-xl font-medium text-slate-600 dark:text-gray-800">
                    +1 (123)456-7890
                  </p>
                  <p className="mb-3 text-xl font-medium text-slate-600 dark:text-gray-800">
                    help@caringguide.org
                  </p>
                </div>
              </Grid>
              <Grid
                xs
                style={{
                  justifyContent: "center",
                  textAlign: "center",
                  alignItems: "center",
                }}
              >
                <div className="max-w-sm p-3 bg-white">
                  <div className="flex flex-col">
                    <SocialIcon
                      url="https://twitter.com/caringguide"
                      style={{ height: 50, width: 50, marginBottom: 10 }}
                    />
                    <SocialIcon
                      url="https://www.facebook.com/profile.php?id=100090495821344"
                      style={{ height: 50, width: 50, marginBottom: 10 }}
                    />
                    <SocialIcon
                      url="https://www.instagram.com"
                      style={{ height: 50, width: 50, marginBottom: 10 }}
                    />
                    <SocialIcon
                      url="https://www.linkedin.com"
                      style={{ height: 50, width: 50, marginBottom: 10 }}
                    />
                  </div>
                </div>
              </Grid>
              <Grid
                xs
                style={{
                  justifyContent: "center",
                  textAlign: "center",
                  alignItems: "center",
                }}
              >
                <div className="max-w-sm p-3 bg-white">
                  <p className="mb-3 text-xl font-bold text-slate-600 dark:text-gray-800">
                    General
                  </p>
                  <p className="mb-3 text-xl font-medium text-slate-600 dark:text-gray-800">
                    Privacy Policy
                  </p>
                  <p className="mb-3 text-xl font-medium text-slate-600 dark:text-gray-800">
                    Terms of Use
                  </p>
                </div>
              </Grid>
            </Grid.Container>
          </div>
        </section>
      </div>
    </>
  );
};

export default landing;
