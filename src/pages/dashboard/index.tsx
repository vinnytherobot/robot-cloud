'use client'

import styles from "../../styles/Dashboard/index.module.css"

import DashboardNavbar from "@/components/DashboardNavbar/index"
import DisplayImages from "@/components/DisplayImages/index"
import ImageUpload from "@/components/ImageUpload/index"

import { GetServerSideProps } from "next"
import { parseCookies } from "nookies"


export default function Dashboard(){
    return(
        <>
            <DashboardNavbar />
            <main className={styles.container}>
                <ImageUpload />
                <DisplayImages />
            </main>
        </>
    )
}
    
export const getServerSideProps: GetServerSideProps = async (context) => {
    const { "auth-token": token } = parseCookies(context);

    if (!token){
        return {
            redirect: {
                destination: "/",
                permanent: false,
            },
        }
    }

    return {
        props: {},
    }
}