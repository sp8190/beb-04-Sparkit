import React from "react";
import NavBar from "./NavBar";
import Home from "./Home";

type Props = {
  children: React.ReactNode;
};

export default function Layout(props: Props) {
  return (
    // width: 100% , padding: 0px
    <div>
      <Home>
        <NavBar />
        {props.children}
      </Home>
    </div>
  );
}
