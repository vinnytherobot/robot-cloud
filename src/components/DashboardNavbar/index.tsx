'use client'

import styles from "../../styles/DashboardNavbar/index.module.css"

import NextLogo from "../../../public/next.svg"
import Avatar from "../../../public/images/avatar.png"

import ImageUpload from "../ImageUpload/index"

import Image from "next/image"
import { parseCookies } from "nookies"
import { useEffect, useState } from "react"
import axios from "axios"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons"

type UserDataType = {
    id: string;
    name: string;
    email: string;
    password: string;
    createdAt: string;
    profilePhotoUrl: string | null;
}

export default function DashboardNavbar() {
    const { "auth-token": id } = parseCookies();
    const [userData, setUserData] = useState<UserDataType | null>(null);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        async function getUserData() {
            const apiUrl = process.env.NEXT_PUBLIC_USER_API_URL;
            try {
                const response = await axios.get(`${apiUrl}/${id}`);
                setUserData(response.data);
            } catch (error) {
                // Handle error
                console.error(error);
            }
        }

        getUserData();
    }, [id]);

    function toggleMenu() {
        setIsOpen(!isOpen);
    }

    return (
        <section className={styles.navbar}>
            <Image src={NextLogo} className={styles.logo} alt="nextLogo" />
            <h1>Welcome {userData?.name}</h1>
            <button className={styles.menuIcon} onClick={toggleMenu}>
                {isOpen ? <FontAwesomeIcon icon={faTimes} /> : <FontAwesomeIcon icon={faBars} />}
            </button>
            <nav className={styles.links}>
                <ImageUpload />
                <Image src={Avatar} alt="avatar" />
            </nav>
        </section>
    )
}