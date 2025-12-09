import {  useState, type ChangeEvent } from "react"
import { useSingleProductContext } from "../hooks/useSingleProductContext"



export default function ImageInput() {
    const { file, onFileSelect, errors, product } = useSingleProductContext();
    const [url, setUrl] = useState(() => {
        let url = ""

        if(file) {
            url = URL.createObjectURL(file)
        }

        return url
    })

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] ?? null

        setUrl(() => {
            let  url = ""

            if(file) {
                url = URL.createObjectURL(file)
            }

            return url
        })
        onFileSelect(file)
    }


    return (
        <div className="flex flex-col gap-3">
        { errors.imageUrl && <p className="text-red-500 text-base">{errors.imageUrl}</p> }

            <div className="flex gap-4">
                {product.imageUrl && (
                    <div className="flex flex-col items-center">
                        <p className="text-sm text-gray-500 mb-1">Imagen actual</p>
                        <img
                            src={product.imageUrl}
                            alt="Backend"
                            className="w-40 h-32 object-cover rounded border border-gray-300 shadow-sm"
                        />
                    </div>
                )}

                {file && (
                    <div className="flex flex-col items-center">
                        <p className="text-sm text-gray-500 mb-1">Imagen seleccionada</p>
                        <img
                            src={url}
                            alt="Selected"
                            className="w-40 h-32 object-cover rounded border border-blue-400 shadow-sm"
                        />
                    </div>
                )}
            </div>

            <label className="block">
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleChange}
                    className="block w-full text-sm text-gray-700
                     file:mr-4 file:py-2 file:px-4
                     file:rounded-lg file:border-0
                     file:text-sm file:font-semibold
                     file:bg-blue-600 file:text-white
                     hover:file:bg-blue-700
                     cursor-pointer"
                />
            </label>
        </div>
    )
}
