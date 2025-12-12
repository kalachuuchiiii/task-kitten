



export const adjustCurrentYear = (yearToDeductOrAdd: number = 0) => {
    const today = new Date();
    const targetYear = new Date();
     targetYear.setFullYear(today.getFullYear() + yearToDeductOrAdd);
    return targetYear;
}