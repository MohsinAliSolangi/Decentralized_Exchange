import React, { useState, useEffect } from "react";
import {
  FaPlus,
  FaList,
  FaShoppingCart,
  FaCoins,
  FaMoneyBill,
  FaExchangeAlt,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import logo from "../logo.png";
import styles from "./Sidebar.module.css"; // Yeh line add karein

const Sidebar = ({ active, setActive }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { id: "create", label: "CreateToken", icon: <FaPlus /> },
    { id: "add", label: "AddToken", icon: <FaList /> },
    { id: "buy", label: "BuyToken", icon: <FaShoppingCart /> },
    { id: "stake", label: "Staking", icon: <FaCoins /> },
    { id: "withdraw", label: "Withdraw", icon: <FaMoneyBill /> },
    { id: "swap", label: "SwapeToken", icon: <FaExchangeAlt /> },
  ];

  const handleResize = () => {
    if (window.innerWidth > 768) {
      setIsMobileMenuOpen(false);
    }
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <div className={styles.mobileHeader}>
        <button
          className={styles.hamburgerBtn}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      <div className={`${styles.sidebar} ${isMobileMenuOpen ? styles.open : ""}`}>
        <div className={styles.logoSection}>
          <img
            src={logo}
            height={70}
            alt="TokenDash Logo"
            className={styles.logoImg}
          />
        </div>

        <ul className={styles.navLinks}>
          {navItems.map((item) => (
            <li
              key={item.id}
              className={`${styles.navItem} ${active === item.id ? styles.active : ""}`}
              onClick={() => {
                setActive(item.id);
                setIsMobileMenuOpen(false); // mobile mein click karne par close ho jayega
              }}
            >
              {item.icon}
              <span>{item.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Sidebar;