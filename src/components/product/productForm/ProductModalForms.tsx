import Modal from "../../UI/Modal";
import ProductForm from "./ProductForm";
import { validateProductDescription, validateProductDiscount, validateProductName, validateProductPrice, validateProductStock } from "../../utils/productValidation";
import { useSingleProductContext } from "../../hooks/useSingleProductContext";
import type { ProductModalFormsModals } from "../../../types";
import LoadingGif from "../../UI/LoadingGif";
import FetchError from "../../UI/FecthError";

type ProductModalFormsProps = {
    modal: ProductModalFormsModals,
    onCloseModal: () => void
}

export default function ProductModalForms({
    modal,
    onCloseModal
}: ProductModalFormsProps) {
    const { product, mode, file, setNewErrors, onSubmit, submitted, endForm, resetErrors, isReady, error, fetchInitialProduct } = useSingleProductContext()
   
    const onClose = () => {
        onCloseModal()
        if (submitted) {
            return endForm()
        }
        resetErrors()

    }

    const onModalInfo = async () => {

        const name = validateProductName(product.name);
        const description = validateProductDescription(product.description)
        const price = validateProductPrice(+product.price)
        const discount = validateProductDiscount(product.discount)
        const stock = validateProductStock(+product.stock)
        let imageUrl = null

        if (mode == 'create') {
            imageUrl = file == null ? "La imagen es obligatoria" : null
        }
        const errors = {
            name, description, price, discount, stock, imageUrl
        }

        const errorValues = Object.values(errors)

        const hasError = errorValues.some(e => e != null)

        setNewErrors(errors)


        if (!hasError) {
            await onSubmit()
        }
    }

    const mapModal = {
        generalInfo: <ProductForm onModalInfo={onModalInfo} onClose={onClose} />,
        none: null,
    }

    

    return (

        <Modal
            open={modal != 'none'}
            onClose={onClose}
        >
            
            {error && <FetchError message="Algo malio sal" title="Error" fetchFun={fetchInitialProduct}/>} 
            { (isReady && !error) && mapModal[modal]}
            { !isReady && <LoadingGif />}
        </Modal>

    )
}