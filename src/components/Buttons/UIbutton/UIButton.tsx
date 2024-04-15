"use client";
import { FC } from "react";
import Link from "next/link";
import cn from "classnames";

import { Icon } from "@/components";
import { UIButtonProps } from "./UIButton.type";
import "./UIbutton.scss";

const UIbutton: FC<UIButtonProps> = ({
  isLoading = false,
  className,
  children,
  fullWidth,
  color = "primary",
  variant = "contained",
  size = "small",
  type = "button",
  icon,
  isCustomIcon,
  alignIcon,
  dataAutomation,
  href,
  ...props
}) => {
  const variantClassName = cn({
    "btn--contained": variant === "contained",
    "btn--outlined": variant === "outlined",
    "btn--text": variant === "text",
  });

  const sizeClassName = cn({
    "btn--small": size === "small",
    "btn--medium": size === "medium",
    "btn--large": size === "large",
  });

  const colorClassName = cn({
    "btn--primary": color === "primary",
    "btn--secondary": color === "secondary",
  });

  const alignIconClassName = cn({
    "btn--with-icon": icon || isCustomIcon,
    "btn--icon-left": alignIcon === "left",
    "btn--icon-right": alignIcon === "right",
  });

  const baseClassName = cn(
    "btn",
    variantClassName,
    colorClassName,
    sizeClassName,
    alignIconClassName,
    {
      "btn--loading": isLoading,
    },
    {
      "btn--fullwidth": fullWidth,
    },
    className
  );

  if (href) {
    return (
      <Link
        href={href}
        data-automation={dataAutomation}
        className={baseClassName}
      >
        {icon ? <Icon className="btn__icon" icon={icon} /> : null}
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      data-automation={dataAutomation}
      className={baseClassName}
      {...props}
    >
      {icon ? <Icon className="btn__icon" icon={icon} /> : null}
      {children}
    </button>
  );
};

export default UIbutton;
