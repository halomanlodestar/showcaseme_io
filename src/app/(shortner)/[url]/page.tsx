import React from "react";
import { redirect } from "next/navigation";

const Shortener = ({ params }: { params: { url: string } }) => {
  return <div>{params.url}</div>;
};

export default Shortener;
