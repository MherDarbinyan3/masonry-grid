export const dateFormat = (date: string) => {
    const dateObj = new Date(date);
    let year = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(dateObj);
    let month = new Intl.DateTimeFormat('en', { month: '2-digit' }).format(dateObj);
    let day = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(dateObj);

    return `${day}-${month}-${year}`;
}