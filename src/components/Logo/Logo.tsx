"use client";
import { FC } from "react";
import Image from "next/image";
import Link from "next/link";
import cn from "classnames";

import { LinksEnum } from "@/types";
import { LogoProps } from "./Logo.type";

const Logo: FC<LogoProps> = ({ className, alt }) => {
  return (
    <div className={cn("max-w-[120px]", className)}>
      <Link href={LinksEnum.HOME} aria-label="Home page nav link">
        <Image
          width={276}
          height={74}
          src={"/vectors/logo.svg"}
          alt={alt || "logo"}
        />
      </Link>
    </div>
  );
};

export default Logo;
