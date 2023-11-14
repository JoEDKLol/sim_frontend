export function getLastMonth() {

    // Convert date to 'year-month-day' format
    const dateToString = date => {
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    const today = new Date();
    // set to the first day of this month
    today.setDate(1);

    let lastDayOfPreviousMonth = new Date(today);
    lastDayOfPreviousMonth.setDate(today.getDate() - 1);

    let firstDayOfPreviousMonth = new Date(today);
    firstDayOfPreviousMonth.setMonth(today.getMonth() - 1);

    let firstDayOfPreviousMonthString = dateToString(firstDayOfPreviousMonth);
    let lastDayOfPreviousMonthString = dateToString(lastDayOfPreviousMonth);

    return [firstDayOfPreviousMonthString, lastDayOfPreviousMonthString];

}