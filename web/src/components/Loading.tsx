import Image from "next/image";
import { FC } from "react";
import LoadingImg from "../../public/loading.png";

interface LoadingProps {
  show: boolean;
}

export const Loading: FC<LoadingProps> = ({ show }) => {
  return show ? (
    <div className="z-[1000] overflow-hidden bg-slate-400/40 w-screen h-screen fixed top-[-100vh] animate-fall flex justify-center items-center">
      <Image
        alt=""
        src={LoadingImg}
        placeholder="blur"
        width={150}
        height={150}
        className="animate-spin-pulse rounded-full"
      />
    </div>
  ) : (
    <></>
  );
};
