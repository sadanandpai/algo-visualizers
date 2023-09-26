import { NavLink } from "react-router-dom";
import { NavbarProps } from "@/sorting-visualizer/models/interfaces";
import classes from "./navbar.module.scss";
import { useState } from "react";

function Navbar({ menuItems }: NavbarProps) {
  const [toggle, setToggle] = useState(false);

  return (
    <nav className={classes.navbar}>
      <h1>Sorting visualizer</h1>

      <button onClick={() => setToggle(!toggle)}>
        <img src="/ham.svg" alt="logo" />
      </button>

      <ul data-toggle={toggle}>
        {menuItems.map((item) => (
          <li key={item}>
            <NavLink
              to={`/sorting-visualizer/${item}`}
              className={({ isActive }) => (isActive ? classes.active : "")}
              onClick={() => setToggle(!toggle)}
            >
              {item}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Navbar;
