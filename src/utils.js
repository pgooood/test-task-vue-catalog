const formatter = new Intl.NumberFormat('ru-Ru', {
    style: 'currency',
    currency: 'RUB',
})

export const formatPrice = (value) => formatter.format(value)