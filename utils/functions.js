export const formatMoney = (number) => {
    switch (Math.sign(number)) {
        case 1:
            return `+${(number).toLocaleString('en-US', {
                style: 'currency',
                currency: 'USD',
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            })}`
        case -1:
            return `-${(number*-1).toLocaleString('en-US', {
                style: 'currency',
                currency: 'USD',
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            })}`
        default:
            return `$0.00`
    }
}

export const formatDate = (date) => {
    return `${date.day}/${date.month}/${date.year}`
}