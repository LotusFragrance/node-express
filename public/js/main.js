$(function() {
    const pathname = location.pathname
    switch (pathname) {
        case '/':
            $('.left-ul li').eq(0).addClass('active')
            break
        case '/about':
            $('.left-ul li').eq(1).addClass('active')
            break
        default:
            break;
    }
})