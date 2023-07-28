import Nav from "../components/nav";
import Streams from "../components/streams";
import { Navbar, Text, Image, Button, Input } from "@nextui-org/react";
import Link from "next/link";
import Articles from "../components/articles";

const FeedPage = () => {
  return (
    <>
      <Streams />
      <Articles />
    </>
  );
};

export default FeedPage;
