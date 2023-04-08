import { FC, ReactNode } from "react";
import { DefaultSeo } from "next-seo";
import defaultConfig from "../lib/seo-config";

export const Layout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <>
      <DefaultSeo {...defaultConfig} />
      <div id="App">{children}</div>
    </>
  );
};
