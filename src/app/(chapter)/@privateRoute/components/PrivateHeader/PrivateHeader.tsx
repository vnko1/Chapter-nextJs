"use client";

import React, { FC, useEffect } from "react";
import { clientApi } from "@/services";
import { EndpointsEnum } from "@/types";

const PrivateHeader: FC = () => {
  useEffect(() => {
    async function getMe() {
      const res = await clientApi.get(EndpointsEnum.PROFILE);
      console.log("🚀 ~ getMe ~ res:", res);
    }

    getMe();
  }, []);

  return <div>PrivateHeader</div>;
};

export default PrivateHeader;
