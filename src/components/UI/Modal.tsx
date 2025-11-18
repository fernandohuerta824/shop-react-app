import { useEffect, useRef, type ReactNode } from "react"

type ModalProps = {
    open: boolean
    onClose: () => void
    children: ReactNode
}

export default function Modal({
    children,
    onClose,
    open
}: ModalProps) {

    const dialogRef = useRef<HTMLDialogElement>(null)

    useEffect(() => {
        if (!dialogRef.current) {
            return
        }


        if (open) {
            dialogRef.current.showModal()
            document.querySelector("body")!.style.overflow = "hidden"
        }

        if (!open) {
            dialogRef.current.close()
            document.querySelector("body")!.style.overflow = "visible"
        }

    }, [open])

    return (
        <dialog
            ref={dialogRef}
            onClose={onClose}
            className="backdrop:backdrop-blur-md z-1 p-4 border-none rounded-xl backdrop:bg-black/75 w-full max-w-xl animate-fadeIn fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        >
            {children}
           
        </dialog>
    )
}