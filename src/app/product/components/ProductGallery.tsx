'use client';

import { useState } from 'react';
import Image from 'next/image';

interface ProductGalleryProps {
  images: string[];
  name: string;
}

export default function ProductGallery({ images, name }: ProductGalleryProps) {
  const [mainImage, setMainImage] = useState(images[0]);
  
  return (
    <div>
      <div className="relative h-96 w-full mb-4 rounded-lg overflow-hidden">
        <Image 
          src={mainImage} 
          alt={name}
          fill
          style={{ objectFit: 'contain' }}
          className="bg-white"
        />
      </div>
      
      <div className="grid grid-cols-5 gap-2">
        {images.map((image, index) => (
          <div 
            key={index} 
            className={`relative h-20 w-full rounded-md overflow-hidden cursor-pointer border-2 ${image === mainImage ? 'border-blue-500' : 'border-transparent'}`}
            onClick={() => setMainImage(image)}
          >
            <Image 
              src={image} 
              alt={`${name} - ${index + 1}`}
              fill
              style={{ objectFit: 'cover' }}
              className="bg-white"
            />
          </div>
        ))}
      </div>
    </div>
  );
}