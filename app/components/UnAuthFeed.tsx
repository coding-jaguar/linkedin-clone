import { SignInButton } from "@clerk/nextjs";

export default function UnAuthFeed() {
  return (
    <div className="flex flex-col items-center justify-center h-full bg-gradient-to-br from-indigo-100 via-white to-blue-100 text-center">
      <div className="p-6 rounded-lg shadow-lg bg-white max-w-lg border border-gray-200">
        <h1 className="text-2xl font-bold text-indigo-700 mb-4">
          You Must Be Signed In to View the Content
        </h1>
        <p className="text-gray-600 mb-6">
          To access the feed and connect with your network, please sign in or
          create an account. <br />
        </p>
        <SignInButton mode="redirect">
          <div className="cursor-pointer bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition duration-200 shadow-md">
            Sign In
          </div>
        </SignInButton>
      </div>
    </div>
  );
}
