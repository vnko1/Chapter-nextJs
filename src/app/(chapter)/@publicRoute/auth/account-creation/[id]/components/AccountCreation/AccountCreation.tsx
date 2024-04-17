import React, { FC } from "react";
import { AccountCreationProps } from "./AccountCreation.type";

const AccountCreation: FC<AccountCreationProps> = ({ id }) => {
  return <div>AccountCreation:{id}</div>;
};

export default AccountCreation;
