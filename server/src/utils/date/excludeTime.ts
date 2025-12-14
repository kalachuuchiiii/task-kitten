

export const excludeTime = (date: Date | string ) => {
    if(!date)return date;
    if(date instanceof Date){
        date.setHours(0, 0, 0, 0);
        return date;
    }
    
    const dateObj = new Date(date);
    dateObj.setHours(0,0,0,0);
    return dateObj;

}