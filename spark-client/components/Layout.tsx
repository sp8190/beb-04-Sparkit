import React from "react";
import NavBar from "./NavBar";

type Props = {
    children: React.ReactNode;
};

export default function Layout(props: Props) {
    return (
        // width: 100% , padding: 0px
        <div >
            <NavBar />
            {props.children}
        </div>
    );
}