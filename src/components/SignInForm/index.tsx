'use client'

import styles from "../../styles/SignInForm/index.module.css"


import SignInImage from "../../../public/images/signin.png"

import { ChangeEventHandler, FormEventHandler } from "react"
import Image from "next/image"


type SignInFormData = {
    handleSubmit: FormEventHandler;
    handleChange: ChangeEventHandler;
    error: boolean;
}


export default function SignInForm({ handleSubmit, handleChange, error }: SignInFormData){
    return(
        <section className={styles.containerForm}>
            <form onSubmit={handleSubmit} className={styles.form}>
                <h1>Welcome to the Sign In page!</h1>
                
                {!error ? (
                    <>
                        <input type="email" className={styles.input} name="email" onChange={handleChange} placeholder="Email" />
                        <input type="password" className={styles.input} name="password" onChange={handleChange} placeholder="Password"/>
                    </>
                ) : (
                    <>
                        <input type="email" className={styles.inputError} name="email" onChange={handleChange} placeholder="Email" />
                        <input type="password" className={styles.inputError} name="password" onChange={handleChange} placeholder="Password"/>
                    </>
                )}

                <input type="submit" className={styles.button} value="Sign In"/>
            </form>

            <Image src={SignInImage} alt="signup-image"/>
        </section>
    )
}