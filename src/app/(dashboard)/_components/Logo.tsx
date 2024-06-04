import React from "react";
import Image from "next/image";

function Logo(): React.ReactNode {
  return <Image src={"/logo.svg"} alt={"logo"} height={150} width={220} />;
}

export default Logo;
