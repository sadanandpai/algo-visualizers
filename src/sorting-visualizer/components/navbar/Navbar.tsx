import { NavLink, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import { NavbarProps } from "@/sorting-visualizer/models/interfaces";
import classes from "./navbar.module.scss";
import { useNavigate } from "react-router-dom";

function Navbar({ menuItems }: NavbarProps) {
  const { algoName } = useParams();
  const navigate = useNavigate();
  const [toggle, setToggle] = useState(false);

  useEffect(() => {
    if (!algoName) {
      navigate(`/sorting-visualizer/${menuItems[0]}`);
    }
  }, [algoName, menuItems, navigate]);

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
