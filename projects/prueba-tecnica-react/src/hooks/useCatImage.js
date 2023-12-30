import { useState, useEffect } from 'react'
export function useCatImage ({ fact }) {
  const [imageUrl, setImageUrl] = useState()

  // efecto para recuperar la imagen
  useEffect(() => {
    if (!fact) return
    const threeFirstWords = fact.split(' ', 3).join(' ')
    const catImageUrl = `https://cataas.com/cat/says/${threeFirstWords}?fontSize=50&fontColor=red`
    setImageUrl(catImageUrl)
  }, [fact])
  return { imageUrl }
}
