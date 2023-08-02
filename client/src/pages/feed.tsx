import Streams from "../components/streams";
import Articles from "../components/articles";
import { WithOnBoarding } from "@/components/WithOnboarding";

const FeedPage = () => {
  return (
    <>
      <Streams />
      <Articles />
    </>
  );
};

export default function Page() {
  return (
    <WithOnBoarding>
      <FeedPage />
    </WithOnBoarding>
  );
}
