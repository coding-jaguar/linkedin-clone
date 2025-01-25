import SearchInput from "@/components/SearchInput";
import Image from "next/image";
import Navitems from "./NavItems";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  return (
    <div className="fixed z-50 w-full bg-white shadow-md">
      <div className="flex justify-center">
        <div className="flex justify-between items-center p-4 max-w-6xl w-full">
          <div className="flex gap-2">
            <Image src="/logo.png" alt="logo" width={35} height={35} />
            <div className="hidden md:block">
              <SearchInput />
            </div>
          </div>
          <div className="flex items-center gap-5 ">
            <div className="md:block hidden">
              <Navitems />
            </div>
            <div>
              <SignedIn>
                <UserButton />
              </SignedIn>
              <SignedOut>
                <Button className="rounded-full " variant={"secondary"}>
                  <SignInButton />
                </Button>
              </SignedOut>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Navbar;
