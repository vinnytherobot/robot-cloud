import styles from "../../../styles/SignUp/index.module.css"

import SuccessImage from "../../../../public/images/success.png"

import SignUpForm from "@/components/SignUpForm/index"

import { ChangeEvent, FormEvent, useState } from "react"
import { useRouter } from "next/router"
import Image from "next/image"
import axios from "axios"
import { setCookie } from "nookies"


type UserDataType = {
    name: string;
    email: string;
    password: string;
}

export default function SignUp(){

    const [userData, setUserData] = useState<UserDataType>(Object);
    const [success, setSuccess] = useState(false);

    const router = useRouter();

    function handleChange(event: ChangeEvent<HTMLInputElement>){
        setUserData({...userData, [event.target.name]: event.target.value})
    }

    async function handleSubmit(event: FormEvent<HTMLFormElement>){
        event.preventDefault();

        const apiUrl = process.env.NEXT_PUBLIC_SIGNUP_API_URL;

        try {
            const response = await axios.post(`${apiUrl}`, userData);
            const userId = response.data.id;

            if(response.status === 201){
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
            setSuccess(false);
        }
    }


    return(
        <>
            {!success ? (
                <main className={styles.container}>
                    <SignUpForm handleSubmit={handleSubmit} handleChange={handleChange}/>
                </main>
            ) : (

                <main className={styles.container}>
                    <Image className={styles.successImage} src={SuccessImage} alt="success-image" />
                </main>
            )}
        </>
    )
}
