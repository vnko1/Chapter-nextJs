"use client";

import { EndpointsEnum } from "@/types";
import { clientApi } from "@/services";
import React, { FC, useEffect } from "react";

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
