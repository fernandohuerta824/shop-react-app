import { useState } from "react"


type useFormProps<T> = {
    fetchFunction: () => Promise<any>
    initialValues: T,
    validate?: (values: T) => Partial<Record<keyof T, string>>
}

export function useForm<T extends Record<string, any>>({
    fetchFunction,
    initialValues,
    validate
}: useFormProps<T>) {
    const [values, setValues] = useState(initialValues)
    const [error, setErrors] =  useState<
        Partial<Record<keyof T, string>> & 
        { general?: string }
    >({})

    const [submiting, setSubmiting] = useState(false)

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value} = e.target

        setValues(values => ({
            ...values,
            [name]: value
        }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
    }
    
    return { 
        values,
        error,
        submiting
    }
}