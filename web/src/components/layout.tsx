import { FC, ReactNode } from "react";
import { DefaultSeo } from "next-seo";
import defaultConfig from "../lib/seo-config";
import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "dragontail-experimental";

export const Layout: FC<{ children: ReactNode }> = ({ children }) => {
  const { data } = useSession();

  return (
    <>
      <DefaultSeo {...defaultConfig} />
      <div id="App" className="min-h-screen">
        {children}
      </div>
      <footer
        className={`p-3 flex justify-evenly items-centered sticky bottom-0 float-right rounded-tl-2xl border-2 border-solid border-slate-600/50 bg-slate-800 h-16 ${
          !data?.user ? "w-64" : "w-48"
        }`}
      >
        {data?.user ? (
          <Button
            onClick={() => {
              signOut();
            }}
            color="red"
          >
            Logout
          </Button>
        ) : (
          <>
            <Button
              onClick={() => {
                signIn("google");
              }}
              color="emerald"
            >
              Login
            </Button>
            <span className="text-sm flex justify-center items-center">
              to generate PDFs.
            </span>
          </>
        )}
      </footer>
    </>
  );
};
