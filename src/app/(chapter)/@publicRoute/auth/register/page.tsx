import React from "react";
import { LinksEnum } from "@/types";
import { AuthLink, Delimiter } from "@/components";
import { BlockAuth } from "../components";
import { RegisterForm } from "./components";

function RegisterPage() {
  return (
    <BlockAuth
      heading="Sign up"
      showBottomText={true}
      typePageText="Create new account"
    >
      <div className="max-w-[327px] w-full mx-auto">
        <RegisterForm />
        <Delimiter />
        <AuthLink
          textMsg="Already have an account ?"
          linkMsg="Log in"
          link={LinksEnum.LOG_IN}
        />
      </div>
    </BlockAuth>
  );
}

export default RegisterPage;
