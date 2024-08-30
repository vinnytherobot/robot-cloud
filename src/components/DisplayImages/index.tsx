'use client'

import styles from "../../styles/DisplayImages/index.module.css";
import { getImageFromDB, getAllImageIDs } from "@/services/IndexedDB";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function DisplayImages() {
    const [images, setImages] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadImages = async () => {
            try {
                // Recupera todos os IDs das imagens
                const ids = await getAllImageIDs();
                console.log('Image IDs:', ids); // Log para verificar os IDs
                // Recupera as imagens baseadas nos IDs
                const imagePromises = ids.map((id) => getImageFromDB(id));
                const imageBases = await Promise.all(imagePromises);
                console.log('Image Base64:', imageBases); // Log para verificar as imagens base64
                setImages(imageBases.filter(Boolean) as string[]);
            } catch (err) {
                console.error('Error loading images:', err);
                setError('Failed to load images.');
            } finally {
                setLoading(false);
            }
        };

        loadImages();
    }, []);

    if (loading) {
        return <p>Loading images...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div className={styles.imagesGallery}>
            {images.length > 0 ? (
                images.map((image, index) => (
                    <div key={index} className={styles.imageItem}>
                        <Image 
                            src={`${image}`} 
                            alt={`Saved Image ${index + 1}`} 
                            layout="responsive"
                            width={400}
                            height={200}
                        />
                    </div>
                ))
            ) : (
                <p>No images saved.</p>
            )}
        </div>
    );
}