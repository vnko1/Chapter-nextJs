import React from "react";
import { CookiesToaster } from "@/components";
import { BlockAuth } from "../../components";
import { AccountCreation } from "./components";

function AccountCreationId({ params: { id } }: { params: { id: string } }) {
  return (
    <>
      <BlockAuth heading="Create account">
        <AccountCreation id={id} />
      </BlockAuth>

      <CookiesToaster />
    </>
  );
}

export default AccountCreationId;
