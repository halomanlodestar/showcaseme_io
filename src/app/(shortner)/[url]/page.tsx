import React from "react";
import { redirect } from "next/navigation";

const Page = ({ params }: { params: { url: string } }) => {
  return <div>{params.url}</div>;
};

export default Page;
