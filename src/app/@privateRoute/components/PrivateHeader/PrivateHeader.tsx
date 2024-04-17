"use client";

import { EndpointsEnum } from "@/types";
import { clientApi } from "@/utils";
import React, { FC, useEffect } from "react";

const PrivateHeader: FC = () => {
  useEffect(() => {
    async function getMe() {
      const response = await clientApi.get(EndpointsEnum.PROFILE);
      console.log("🚀 ~ getMe ~ response:", response);
    }

    getMe();
  }, []);

  return <div>PrivateHeader</div>;
};

export default PrivateHeader;
