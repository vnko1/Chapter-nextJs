"use client";
import { FC } from "react";
import Image from "next/image";
import cn from "classnames";

import { LinksEnum } from "@/types";
import { LogoProps } from "./Logo.type";

const Logo: FC<LogoProps> = ({ className, alt }) => {
  return (
    <div className={cn("max-w-[120px]", className)}>
      <a href={LinksEnum.HOME} aria-label="Home page nav link">
        <Image
          width={276}
          height={74}
          src={"/vectors/logo.svg"}
          alt={alt || "logo"}
        />
      </a>
    </div>
  );
};

export default Logo;
