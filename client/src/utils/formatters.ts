export const formatCurrency = (amount: number | string): string => {
    const value = typeof amount === 'string' ? parseFloat(amount.replace(/[^0-9.-]+/g, "")) : amount;

    if (isNaN(value)) return '0,00 MZN';

    return new Intl.NumberFormat('pt-MZ', {
        style: 'currency',
        currency: 'MZN',
        minimumFractionDigits: 2
    }).format(value).replace('MTn', '').trim() + ' MZN';
};
