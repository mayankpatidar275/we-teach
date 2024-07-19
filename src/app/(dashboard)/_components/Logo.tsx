import React from "react";
import Image from "next/image";
import Link from "next/link";

function Logo(): React.ReactNode {
  return (
    <Link href="/">
      <Image src={"/logo.svg"} alt={"logo"} height={150} width={220} />
    </Link>
  );
}

export default Logo;
