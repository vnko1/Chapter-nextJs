import React from "react";
import { BlockAuth } from "@/app/@publicRoute/auth/components";

function RegisterPage() {
  return (
    <BlockAuth
      heading="Sign up"
      showBottomText={true}
      typePageText="Create new account"
    >
      <div>RegisetPage</div>
    </BlockAuth>
  );
}

export default RegisterPage;
