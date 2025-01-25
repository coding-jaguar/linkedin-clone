import {
  Bell,
  BriefcaseBusiness,
  Home,
  MessageCircleCode,
  Users,
} from "lucide-react";
import Link from "next/link";
import { JSX } from "react";

type NavItem = {
  src: string;
  icon: JSX.Element;
  text: string;
};

const navItems: NavItem[] = [
  {
    src: "/home",
    icon: <Home />,
    text: "Home",
  },
  {
    src: "/networks",
    icon: <Users />,
    text: "My Network",
  },
  {
    src: "/jobs",
    icon: <BriefcaseBusiness />,
    text: "Jobs",
  },
  {
    src: "/messaging",
    icon: <MessageCircleCode />,
    text: "Messaging",
  },
  {
    src: "/notifications",
    icon: <Bell />,
    text: "Notifications",
  },
];

const Navitems = () => {
  return (
    <div className="flex gap-8">
      {navItems.map((navItem, index) => (
        <div
          className="flex flex-col items-center cursor-pointer text-[#666666] hover:text-black"
          key={index}
        >
          <span>{navItem.icon}</span>
          <Link className="text-xs" href={navItem.src}>
            {navItem.text}
          </Link>
        </div>
      ))}
    </div>
  );
};
export default Navitems;
