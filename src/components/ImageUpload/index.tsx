'use client'

import styles from "../../styles/ImageUpload/index.module.css"
import { ChangeEvent, useEffect, useState } from "react"
import { saveImageToDB, getAllImageIDs, getImageFromDB } from "@/services/IndexedDB"

export default function ImageUpload() {
    const [images, setImages] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadImages = async () => {
            try {
                const ids = await getAllImageIDs();
                const imagePromises = ids.map((id) => getImageFromDB(id));
                const imageBases = await Promise.all(imagePromises);
                setImages(imageBases.filter(Boolean) as string[]);
            } catch(err){
                setError('Failed to load images.');
            } finally {
                setLoading(false);
            }
        };

        loadImages();
    }, [])

    async function handleImageChange(event: ChangeEvent<HTMLInputElement>){
        const file = event.target.files?.[0];
        if(file){
            const reader = new FileReader();
            reader.onloadend = async () => {
                const base64String = reader.result as string;
                const newKey = `image_${Date.now()}`;

                try {
                    await saveImageToDB(newKey, base64String);
                    setImages((prevImages) => [...prevImages, base64String]);
                } catch (err) {
                    setError('Failed to save image.');
                }
            }
            
            reader.readAsDataURL(file);
        }
    }

    return (
        <>
            <label htmlFor="fileUpload" className={styles.uploadButton}>
                Upload Image
                <input 
                    type="file" 
                    id="fileUpload"
                    accept="image/*" 
                    onChange={handleImageChange} 
                    className={styles.fileInput} 
                />
            </label>
        </>
    )
}