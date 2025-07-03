export const calculateProfite = (order) => {
    console.log("order --------- ", order.orderItem?.sellPrice, order.orderItem?.buyPrice, order.orderItem?.quantity);

    if (
        order &&
        order.orderItem &&
        typeof order.orderItem.buyPrice === 'number' &&
        typeof order.orderItem.sellPrice === 'number' &&
        typeof order.orderItem.quantity === 'number'
    ) {
        const profit = (order.orderItem.sellPrice - order.orderItem.buyPrice) * order.orderItem.quantity;
        return Number(profit.toFixed(2)); // Returnează un număr cu maxim două zecimale
    }

    return "-";
};
