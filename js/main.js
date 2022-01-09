$(() => {
function slideUl() {
    const toggler = $(".toggler");
    const mainNav = $(".mainNav ul");
    check();
    $(window).resize(() => {check();});
    toggler.on("click" , () => {mainNav.slideToggle();toggler.toggleClass("active")})

    function check() {
        if($(window).width() > 767)
            mainNav.slideDown() , toggler.addClass("active");
        else mainNav.slideUp() , toggler.removeClass("active");
    }
}

function showWhenScroll() {
    const elements = $(".show-when-scroll");
    check();
    $(window).on("scroll resize" , () => {
        check();
    })
    function check() {
        elements.each((i , e) => {
            if(Math.abs($(window).scrollTop() - $(e).offset().top) < 600 * ($(window).height() / 600))
                $(e).addClass("active");
        })
    }
}

function showcarts() {
    $("body").prepend(`<div class="overlay"></div><div class="show-carts">
    <div class="header"><div class="text-muted">Your Cart</div>
    <span class="esc" style="cursor: pointer;"><svg width="16px" height="16px" viewBox="0 0 16 16">
    <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g fill-rule="nonzero" fill="#333333">
    <polygon points="6.23223305 8 0.616116524 13.6161165 2.38388348 15.3838835 8 9.76776695 13.6161165 15.3838835 15.3838835 13.6161165 9.76776695 8 15.3838835 2.38388348 13.6161165 0.616116524 8 6.23223305 2.38388348 0.616116524 0.616116524 2.38388348 6.23223305 8">
    </polygon></g></g></svg></span></div><div class="body"></div><div class="footer"><h1 class="f-d4">Subtotal</h1>
    <h1 class="f-d4">$ 0.00 USD</h1></div><button class="but">Continue to Checkout</button></div>`);
    
    const overLay = $(".overlay");
    const cart = $(".show-carts");
    const shop = $(".carts");
    let number = shop.find(".num-of-carts") , numcot = 0;
    const esc = cart.find(".esc");
    const body = cart.find(".body");
    const total = cart.find(".footer h1:last-of-type");
    let sum = 0 , cot = 0;
    let mx = 0;
    total.val(sum);
    const add = $(".add-to-cart");
    add.prev().val(1);

    check();
    $(window).resize(()=> {check();})

    shop.on("click" , () => {show()});
    overLay.on("click" , () => {hide()});
    esc.on("click" , () => {hide()});

    add.on("click" , function() {
        let img = $(this).parent().prev().children().attr("src")
        let amount = $(this).prev().val();
        let price = $(this).prev().prev().text().split(" ")[1];
        let name = $(this).prevAll("h1").text();
        window.sessionStorage.setItem(`ads ${cot}` , `${img} ${amount} ${price} ${name}`);
        mx++;
        addToBody(img , amount , price , name);
    })
    function addToBody(img , amout , price , name , notFromSessionStorage = true , mx = -1) {
        let element=`<div class="element"><img src="${img}" alt=""><span>
            <span class="name">${name}</span><span class="price">$ ${price} USD</span>
            <span class="link text-danger text-decoration-underline">Remove</span></span>
            <div class="number text-main">${amout}</div></div>`;
        body.append(element);
        sum += (price - 0) * (amout - 0);
        total.text(`$ ${sum} USD`);
        let link = body.find(".element .link").eq(mx);
        let i = cot;
        console.log(link , 'link')
        console.log(i , "i");
        link.on("click" , function() {
            sum -= (price - 0) * (amout - 0);
            $(this).closest(".element").hide(200);
            window.sessionStorage.removeItem(`ads ${i}`);
            total.text(`$ ${sum} USD`);
            number.text(--numcot)
        });
        check();
        if(notFromSessionStorage)show();
        cot++;
        number.text(++numcot)
    }
    function hide() {cart.removeClass("active");overLay.removeClass("active");}
    function show() {cart.addClass("active");overLay.addClass("active");}
    function check()
    {
        show();
        body.outerHeight(cart.outerHeight(true) - cart.find(".header").outerHeight(true) - 
        cart.find(".footer").outerHeight(true) - cart.find("button").outerHeight(true) , true);
        hide();
    }
    
    for(let i = 0 , j = window.sessionStorage.length ;  i < j ; i++){
        let x = window.sessionStorage.key(i);
        if(x.includes("ads")){
            cot = x.split(" ")[1] - 0;
            console.log(cot , "cot")
            console.log(x , "x")
            x = window.sessionStorage.getItem(x);
            x = x.split(' ');
            addToBody(x[0] , x[1] , x[2] , x[3] , false , mx);mx++;
        }
    }
    number.text(numcot);
}

function scrollToTop(){
    $("body").append(`<div class="scroll-to-top"><img src="img/arrow-right-white.svg" alt=""></div>`)
    let toTop = $(".scroll-to-top");
    toTop.on("click",_=>{window.scrollTo({top:0,})})
}
// to Show The Menu When Click On Toggler
slideUl();

// shoing what i added to cart
showcarts();


// adding The mainAnimation 
showWhenScroll();

// scroll to Top
scrollToTop();
})