import { SocialIcon } from "react-social-icons";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-4">
      <div className="container mx-auto flex justify-between items-center">
        <div>
          <p className="mb-2">Follow Us</p>
          <div className="flex flex-col">
            <SocialIcon
              url="https://twitter.com/caringguide"
              style={{ height: 25, width: 25, marginBottom: 10 }}
            />
            <SocialIcon
              url="https://www.facebook.com/profile.php?id=100090495821344"
              style={{ height: 25, width: 25, marginBottom: 10 }}
            />
          </div>
        </div>
        <p className="text-center">© 2023 Caring Guide. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
