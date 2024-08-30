'use client'

import styles from "../../../styles/SignIn/index.module.css"

import SignInForm from "@/components/SignInForm/index"

import SuccessImage from "../../../../public/images/success.png"

import Image from "next/image"
import { useRouter } from "next/router"
import { ChangeEvent, FormEvent, useState } from "react"
import axios from "axios"
import { setCookie } from "nookies"
import { headers } from "next/headers"


type UserDataType = {
    name: string;
    email: string;
    password: string;
}

export default function SignIn(){
    const headersList = headers();

    const [userData, setUserData] = useState<UserDataType>(Object);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);

    const router = useRouter();

    function handleChange(event: ChangeEvent<HTMLInputElement>){
        setUserData({...userData, [event.target.name]: event.target.value})
    }

    async function handleSubmit(event: FormEvent<HTMLFormElement>){
        event.preventDefault();

        const apiUrl = process.env.NEXT_PUBLIC_SIGNIN_API_URL;

        try {
            const response = await axios.post(`${apiUrl}`, userData);
            const userId = response.data.id;
                
            if(response.status === 200){
                setCookie(null, "auth-token", userId, {
                    maxAge: 365 * 24 * 60 * 60, // 365 days
                    path: "/",
                });
                
                setSuccess(true);

                setTimeout(() => {
                    router.push("/dashboard");
                }, 2500)
            }

        } catch(error){
            setError(true);
        }
    }


    return(
        <>
            {!success ? (
                <main className={styles.container}>
                    <SignInForm error={error} handleSubmit={handleSubmit} handleChange={handleChange}/>
                </main>
            ) : (

                <main className={styles.container}>
                    <Image className={styles.successImage} src={SuccessImage} alt="success-image" />
                </main>
            )}
        </>
    )
}