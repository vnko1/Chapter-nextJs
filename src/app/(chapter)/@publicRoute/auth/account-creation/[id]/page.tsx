import React from "react";
import { CookiesToaster } from "@/components";
import { BlockAuth } from "../../components";

function AccountCreationId({ params: { id } }: { params: { id: string } }) {
  console.log(id);
  return (
    <>
      <BlockAuth heading="Create account">
        <div>Create Account</div>
      </BlockAuth>
      ;
      <CookiesToaster />
    </>
  );
}

export default AccountCreationId;
