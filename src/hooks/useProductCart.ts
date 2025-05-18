import { useState, useEffect } from "react";

function useProductCart( price: number, initialQuantity: number) {
    const [quantity, setQuantity] = useState<number>(initialQuantity);
    const [subTotal, setSubTotal] = useState<number>(price);

    useEffect(() => {
        setSubTotal(price * quantity);
    }, [price, quantity]);

   const changeQuantity = (newQty: number) => {
        if(newQty < 1) return;
        setQuantity(newQty);
    }

    return {
        quantity,
        subTotal,
        changeQuantity
    }
}

export default useProductCart;