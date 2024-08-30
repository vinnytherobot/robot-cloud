'use client'

import styles from "../styles/Home.module.css"

import Gallery from "../../public/images/gallery.png"

import HomeNavbar from "@/components/HomeNavbar/index"

import Link from "next/link"
import Image from "next/image"
import { GetServerSideProps } from "next"
import { parseCookies } from "nookies"


export default function Home(){
    return(
        <>
            <HomeNavbar />
            <main className={styles.container}>
                <section className={styles.welcomeInformation}>
                    <h1>Welcome to the best photo storage</h1>
                    <p>Create your own photo and image storage environment on the world's best storage site!</p>
                    <Link href="/auth/signup">Get Started ⮕</Link>
                </section>
                <Image src={Gallery} alt="gallery-image" />
            </main>
        </>
    )
}


export const getServerSideProps: GetServerSideProps = async (context) => {
    const { "auth-token": token } = parseCookies(context);

    if(token){
        return{
            redirect: {
                destination: "/dashboard",
                permanent: false,
            },
        }
    }

    return {
        props: {},
    }
}