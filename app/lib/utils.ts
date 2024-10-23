export const roundToTwoDecimals = (num: number): number => Math.round(num * 100) / 100;

export const today = (): string => {
    const today = new Date();
    
    const day = String(today.getDate()).padStart(2, '0'); 
    const month = String(today.getMonth() + 1).padStart(2, '0'); 
    const year = today.getFullYear();

    return `${day}/${month}/${year}`;
};

export const parseDDMMAAAAtoDate = (dateStr: string): Date => {
    const day = parseInt(dateStr.slice(0, 2), 10); 
    const month = parseInt(dateStr.slice(3, 5), 10) - 1; 
    const year = parseInt(dateStr.slice(6, 9), 10);  

    return new Date(year, month, day);  
};