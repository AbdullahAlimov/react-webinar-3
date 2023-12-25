export default function scrollToElement(elementRef){
    elementRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
    });
}