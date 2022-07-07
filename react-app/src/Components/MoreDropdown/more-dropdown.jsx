import "./more-dropdown.css";
import { useState, useEffect } from "react";


const MoreDropdown = ({ board }) => {
  const [toggleDropdown, setToggleDropdown] = useState(false);

  const handleToggle = (e) => {
    if (toggleDropdown) return
    setToggleDropdown(true)
  }

  useEffect(() => {
    if (!toggleDropdown) return

    const closeMenu = () => {
      setToggleDropdown(false);
    };

    document.addEventListener('click', closeMenu);
    return () => document.removeEventListener("click", closeMenu);
  }, [toggleDropdown])

  return (
    <>
      <div className="more__container" onClick={handleToggle}>
        <span className="material-symbols-outlined">more_horiz</span>
      </div>
      {toggleDropdown && <div className="more__dropdown">Close board...</div>}
    </>
  );
};

export default MoreDropdown;
