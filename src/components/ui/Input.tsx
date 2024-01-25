"use client";
import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const Input = (props: InputProps) => {
  return (
    <div className={"flex flex-col space-y-1.5"}>
      <label htmlFor={props.label} className={""}>
        {props.label}
      </label>
      <input
        className={"h-10 px-3 rounded outline-0 text-sm"}
        name={props.label}
        {...props}
      />
    </div>
  );
};

export default Input;
