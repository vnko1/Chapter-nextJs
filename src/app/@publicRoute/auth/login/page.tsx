import React from "react";
import { LinksEnum } from "@/types";
import { AuthLink, Delimiter } from "@/components";
import { BlockAuth } from "../components";
import { LoginForm } from "./components";

function LoginPage() {
  return (
    <BlockAuth heading="Log in" showBottomText={true} typePageText="Log in">
      <div className="max-w-[327px] w-full mx-auto">
        <LoginForm />
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

export default LoginPage;
