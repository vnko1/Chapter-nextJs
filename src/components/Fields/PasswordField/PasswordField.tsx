"use client";
import { ChangeEvent, FC, useState } from "react";
import Link from "next/link";
import { useFormContext } from "react-hook-form";
import cn from "classnames";

import { emojiRegex } from "@/utils";
import { IconEnum } from "@/types";
import { Icon } from "@/components";
import { PasswordFieldProps } from "./PasswordField.type";
import {
  usePasswordStrength,
  TypePasswordStrength,
} from "./usePasswordStrength";
import styles from "./PasswordField.module.scss";

const PasswordField: FC<PasswordFieldProps> = ({
  id,
  className,
  label,
  name,
  value,
  defaultValue,
  dataAutomation,
  strength,
  strengthMessage = "Password must be at least 8 characters long, include only Latin letters, one uppercase letter, one number, space symbol mustn't be included",
  helperLink,
  additionalLabel,
  customErrorMessage,
  onChange,
  ...props
}) => {
  const { register, setValue, getFieldState, getValues } = useFormContext();
  const { isTouched, error } = getFieldState(name);
  const fieldValue = getValues(name);

  const [isVisiblePassword, setIsVisiblePassword] = useState<boolean>(false);

  const { passwordStrength, passwordValue, LENGTH_STRENGTH, onHandleChange } =
    usePasswordStrength();

  const typePasswordStrengthClassname = cn({
    [TypePasswordStrength.WEAK]: passwordStrength === 1,
    [TypePasswordStrength.OKEY]: passwordStrength === 2,
    [TypePasswordStrength.STRONG]: passwordStrength === 3,
  });

  const isErrorValidation = isTouched && error;

  const validationClassname = cn({
    [styles["text-field--success"]]: isTouched && !error,
    [styles["text-field--has-error"]]: isErrorValidation,
  });

  const onHandleChangeField = (event: ChangeEvent<HTMLInputElement>) => {
    event.target.value = event.target.value
      .replace(" ", "")
      .replace(emojiRegex, "");
    setValue(name, event.target.value);
    onHandleChange(event.target.value);
    onChange && onChange(event);
  };

  return (
    <div className={cn(styles["text-field"], validationClassname, className)}>
      <label htmlFor={id} className={styles["text-field__label"]}>
        {label && <p className={styles["text-field__label-text"]}>{label}</p>}
        <div className={styles["text-field__holder"]}>
          <input
            {...register}
            {...props}
            id={id}
            name={name}
            data-automation={dataAutomation}
            type={isVisiblePassword ? "text" : "password"}
            value={value}
            defaultValue={defaultValue}
            className={styles["text-field__input"]}
            onChange={onHandleChangeField}
          />
          {fieldValue?.length ? (
            <Icon
              icon={isVisiblePassword ? IconEnum.Eye : IconEnum.Eye_Off}
              size={18}
              color="#8E8E93"
              onClick={() => setIsVisiblePassword(!isVisiblePassword)}
              className={styles["text-field__icon"]}
            />
          ) : null}
        </div>
      </label>
      {strength && !additionalLabel && fieldValue && !isTouched && (
        <p className={styles["text-field__requirements"]}>{strengthMessage}</p>
      )}
      <div className={styles["text-field__helper-box"]}>
        {isErrorValidation ? (
          <p className={styles["text-field__error-message"]}>{error.message}</p>
        ) : null}
        {helperLink ? (
          <Link
            href={helperLink.href}
            className={styles["text-field__helper-link"]}
          >
            {helperLink.text}
          </Link>
        ) : null}
        {customErrorMessage ? (
          <p className="text-field__custom-error-message">
            {customErrorMessage}
          </p>
        ) : null}
        {additionalLabel && !customErrorMessage && !isErrorValidation ? (
          <p className={styles["text-field__label-sub-text"]}>
            {additionalLabel}
          </p>
        ) : null}
      </div>
      {strength &&
      passwordValue &&
      fieldValue?.length &&
      passwordStrength >= 0 ? (
        <div
          className={cn(
            styles["strength-progress"],
            styles[`strength-progress--${typePasswordStrengthClassname}`]
          )}
        >
          {Array.from(Array(LENGTH_STRENGTH).keys()).map((item) => (
            <div
              key={item}
              className={cn(styles["strength-progress__item"], {
                [styles["strength-progress__item--active"]]:
                  item < passwordStrength,
              })}
            ></div>
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default PasswordField;
