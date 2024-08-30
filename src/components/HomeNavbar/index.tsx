'use client'

import styles from "../../styles/HomeNavbar/index.module.css"

import NextLogo from "../../../public/next.svg"

import Image from "next/image"
import Link from "next/link"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons"
import { useState } from "react"


export default function HomeNavbar(){
    const [isOpen, setIsOpen] = useState(false);
    
    function toggleMenu() {
        setIsOpen(!isOpen);
    }
    return(
        <section className={styles.navbar}>
            <Image src={NextLogo} className={styles.logo} alt="nextLogo" />
            <nav className={styles.links}>
                <Link href="https://github.com/vinnytherobot" target="_blank">About Us</Link>
                <Link href="/auth/signup">Sign Up</Link>
                <Link href="/auth/signin">Sign In</Link>
            </nav>
            <button className={styles.menuIcon} onClick={toggleMenu}>
                {isOpen ? <FontAwesomeIcon icon={faTimes} /> : <FontAwesomeIcon icon={faBars} />}
            </button>
        </section>
    )
}