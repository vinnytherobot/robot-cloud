'use client'

import styles from "../../styles/SignUpForm/index.module.css"

import SignUpImage from "../../../public/images/signup.png"

import { ChangeEventHandler, FormEventHandler } from "react"
import Image from "next/image"


type SignUpFormData = {
    handleSubmit: FormEventHandler;
    handleChange: ChangeEventHandler;
}


export default function SignUpForm({ handleSubmit, handleChange }: SignUpFormData){
    return(
        <section className={styles.containerForm}>
            <form onSubmit={handleSubmit} className={styles.form}>
                <h1>Welcome to the Sign Up page!</h1>
                
                <input type="text" className={styles.input} name="name" onChange={handleChange} placeholder="Name"/>
                <input type="email" className={styles.input} name="email" onChange={handleChange} placeholder="Email" />
                <input type="password" className={styles.input} name="password" onChange={handleChange} placeholder="Password"/>
                
                <input type="submit" className={styles.button} value="Create Account"/>
            </form>

            <Image src={SignUpImage} alt="signup-image"/>
        </section>
    )
}