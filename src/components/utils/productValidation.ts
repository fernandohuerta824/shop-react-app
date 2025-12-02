export function validateProductName(name: string, update = false) {
    if(!name && !update) {
        return "El nombre es obligatorio"
    }

    if(name.length < 5) {
        return "El nombre debe tener mas de 5 caracteres de largo"
    }

    if(name.length > 80) {
        return "El nombre debe tener menos de 80 caracteres de largo"
    }

    return null;
}

export function validateProductDescription(description: string, update = false) {
    if(!description && !update) {
        return "La descripcion es obligatorio"
    }

    if(description.length < 5) {
        return "La descripcion debe tener mas de 5 caracteres de largo"
    }

    if(description.length > 255) {
        return "La descripcion debe tener menos de 255 caracteres de largo"
    }

    return null;
}

export function validateProductPrice(price: number) {
    if(price < 0) {
        return "El precio debe ser mayor o igual a 0"
    }

    if(price > 100_000) {
        return "El precio debe ser menor o igual a 100,000"
    }


    return null;
}

export function validateProductDiscount(discount: number | null) {
    if(discount == null) {
        return null
    }

    if(discount < 0) {
        return "El descuento debe ser mayor o igual a 0"
    }

    if(discount > 100) {
        return "El descuento debe ser menor o igual a 100"
    }


    return null;
}

export function validateProductStock(stock: number) {
    if(stock < 0) {
        return "El stock debe ser mayor o igual a 0"
    }

    if(stock > 1_000) {
        return "El stock debe ser menor o igual a 1,000"
    }


    return null;
}
