"use client";
import { FC, ChangeEvent } from "react";
import Link from "next/link";
import { useFormContext } from "react-hook-form";

import cn from "classnames";

import { IconEnum } from "@/types";
import { Icon } from "@/components";
import { TextFieldProps } from "./TextField.type";
import "./TextField.scss";

const TextField: FC<TextFieldProps> = ({
  id,
  className,
  label,
  name,
  type = "text",
  value,
  defaultValue,
  showSuccessIcon = false,
  dataAutomation,
  helperLink,
  customErrorMessage,
  additionalLabel,
  onChange,
  ...props
}) => {
  const { register, setValue, getFieldState } = useFormContext();
  const { isTouched, error } = getFieldState(name);

  const isSuccessValidation = isTouched && !error;
  const isErrorValidation = isTouched && error;

  const validationClassname = cn({
    "text-field--has-error": isErrorValidation,
  });

  const onHandleChangeField = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(name, event.target.value);
    onChange && onChange(event);
  };

  return (
    <div className={cn("text-field", validationClassname, className)}>
      <label htmlFor={id} className="text-field__label">
        {label && <p className="text-field__label-text">{label}</p>}
        <div className="text-field__holder">
          <input
            {...props}
            {...register}
            id={id}
            data-automation={dataAutomation}
            type={type}
            value={value}
            defaultValue={defaultValue}
            className={"text-field__input"}
            onChange={onHandleChangeField}
          />
          {showSuccessIcon && isSuccessValidation && !customErrorMessage ? (
            <Icon icon={IconEnum.Ok} size={20} className="text-field__icon" />
          ) : null}
        </div>
      </label>
      <div className="text-field__helper-box">
        {isErrorValidation ? (
          <p className="text-field__error-message">{error.message}</p>
        ) : null}
        {helperLink ? (
          <Link href={helperLink.href} className="text-field__helper-link">
            {helperLink.text}
          </Link>
        ) : null}
        {customErrorMessage ? (
          <p className="text-field__custom-error-message">
            {customErrorMessage}
          </p>
        ) : null}
        {additionalLabel && !(value as string).length ? (
          <p className="text-field__additional-label">{additionalLabel}</p>
        ) : null}
      </div>
    </div>
  );
};

export default TextField;
