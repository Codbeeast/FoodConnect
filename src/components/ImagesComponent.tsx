import { useEffect, useState } from 'react'

const ImagesComponent = () => {
  const [images, setImages] = useState<string[]>([])

  useEffect(() => {
    fetch('http://localhost:5000/api/images')
      .then(res => res.json())
      .then(data => setImages(data.map((img: any) => img.imageUrl)))
      .catch(err => console.error(err))
  }, [])

  return (
    <div className="p-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      {images.map((url, i) => (
        <div key={i} className="border rounded-lg overflow-hidden shadow-lg">
          <img src={url} alt={`uploaded-${i}`} className="w-full h-48 object-cover" />
        </div>
      ))}
    </div>
  )
}

export default ImagesComponent
