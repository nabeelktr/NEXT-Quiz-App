import { Metadata } from "next";

import Login from "../component/Login";
export const metadata: Metadata = {
  title: {
    absolute: "Admin | Quiz App",
  },
};

export default function Instructor() {
  return (
    <div>
      <Login />
    </div>
  );
}
