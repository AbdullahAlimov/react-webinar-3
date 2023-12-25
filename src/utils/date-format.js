export default function dateFormat(date,lang, options={
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
}){
    const formattedDate = date.toLocaleDateString(lang, options);
    const year = date.getFullYear();

    const finalFormattedDate = formattedDate.replace(` ${year} г.`, ` ${year}`);

    return(finalFormattedDate)
}