import { LinksEnum } from "@/types";
import { redirect } from "next/navigation";

function AuthPage() {
  return redirect(LinksEnum.LOG_IN);
}

export default AuthPage;
