jQuery(function ($){
    /* add/remove class on view screen
     * @param selector to set a selector of element on which we want to add/remove class
     * @once if false it will remove class after leaving an element visible area and add again after coming back
     */
    function setClassOnView(selector, once=true){
        $(selector).each(function() {
            if (isScrolledIntoView($(this))) {
                $(this).addClass("in-visible");
            }else{
                if(once === false){
                    $(this).removeClass("in-visible");
                }
            }
        });
    }
    function isScrolledIntoView(elem) {
        const docViewTop = $(window).scrollTop();
        const docViewBottom = docViewTop + $(window).height();

        const elemTop = $(elem).offset().top;
        const elemBottom = elemTop + $(elem).height();

        return ((elemBottom <= 1.2*docViewBottom) && (elemTop >= 0.8*docViewTop));
    }
    // set attrs in loop
    function addProp(selector, varName, step=0.1){
        $(selector).children().each(function (i){
            let val = i*step;
            $(this).css(varName, val + "s");
        });
    }

    function rand(min, max){
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min) + min);
    }

    // reveal animation
    window.sr = ScrollReveal();
    sr.reveal('.section-heading__top, .section-marketing__block, .section-signup, .section-seo-math, .section-info, .section-studies', {
        afterReveal: function (el){
            el.classList.add("in-visible");
        }
    });

    sr.reveal('.section-contact h1, .section-contact__row > *, .section-call .container > *, .doctor-review, .section-studies__title > *, .section-studies__txt > *, .doctor-intro__txt > *, .section-archive__txt > *, .section-turnup__txt > *, .section-seo-math .container > *, .section-reports__row > *, .section-banner__txt > *, .section-seo__row > *, .section-info__txt > *, .section-prework .container > *, .section-lock__txt > *, .section-intro__txt > *, .section-quality-leads__head > *, .section-quality-leads__row > *, .section-about__txt > *, .section-prem-partners .container > *, .section-heading__text > *, .section-case-st > * > *, .section-marketing__txt > *, .section-big-number__txt > *, .section-leads__txt > *, .section-signup .container > *, .footer .widgets, .footer__subscribe, .footer__bottom', {
        scale: 1,
        duration: 1800,
        interval: 80,
        delay: 300,
        mobile: true,
        origin: 'bottom',
        distance: '30px',
    });
    sr.reveal('.section-dads__txt', {
        scale: 1,
        duration: 1800,
        interval: 80,
        delay: 300,
        mobile: true,
        origin: 'right',
        distance: '30px',
    });
    sr.reveal('.section-reports__box, .section-address__col', {
        scale: 0.6,
        duration: 1800,
        interval: 80,
        delay: 300,
        mobile: true,
        distance: '30px',
    });
    sr.reveal('.section-turnup__media img', {
        scale: 1,
        duration: 1800,
        interval: 80,
        delay: 300,
        mobile: true,
        distance: '50px',
        origin: 'left',
    });

    // modal
    function createModal(obj = {}){
        const {
            selector = "",
            fnc = () => {}
        } = obj;
        if(!$(selector).length) return;

        $("body").addClass("modal-open");
        $(selector).appendTo("body");
        $(selector).fadeIn(200);
        fnc();
    }
    function closeModal(modal=$(this)){
        $("body").removeClass("modal-open");
        modal.hide(0);
    }
    $(".modal .modal__close, .modal [data-modal-close] ").click(function (e){
        closeModal($(this).closest(".modal"));
    });
    $(".modal").click(function (e){
        if(e.target === this){
            closeModal($(this));
        }
    });
    $("[data-modal]").click(function (e){
        e.preventDefault();
        closeModal($(".modal"));
        const sel = $(this).data("modal");
        if(sel){
            createModal({
                selector: sel,
            });
        }
    });

    let openOnLoad = setTimeout(function (){
        createModal({
            selector: "#openOnLoad",
        });
    }, 5000);

    // sliders
    if(typeof $.fn.slick === "function"){
        $(".js-case-studies-list").slick({
            variableWidth: true,
            arrows: false,
            responsive: [{
                breakpoint: 1024,
                settings: {
                    dots: true
                }
            }]
        });
    }

    // accordion
    $(".accordion__title").click( function (e){
        e.preventDefault();
        let item = $(this).parent(".accordion__item");
        let state = "open";
        if(item.attr("data-state") === "open"){
            state = "close";
        }
        $(this).parent(".accordion__item").siblings().attr("data-state", "close");
        $(this).parent(".accordion__item").siblings().children(".accordion__content").slideUp();
        item.children(".accordion__content").slideToggle(function (){
            item.attr("data-state", state);
        });
    });

    $(".menu-toggle").click(function (e){
        e.preventDefault();
        $("body").toggleClass("mobile-menu-open");
        let svg = $(this).find("use");
        if(svg.attr("xlink:href") === '#menu'){
            svg.attr("xlink:href", "#close");
        }else{
            svg.attr("xlink:href", "#menu");
        }
    });

    function setMinH(el){
        let maxHeight = 0;
        el.css("height", "auto");
        el.each(function (){
            if($(this).height() > maxHeight){
                maxHeight = $(this).height();
            }
        });
        el.css("height", maxHeight);
    }
    setMinH($(".case-studies-list .case-study__head, .section-reports__box p"));
    $(window).resize(function (){
        setMinH($(".case-studies-list .case-study__head, .section-reports__box p"));
    });

    // setting class when view area
    setClassOnView(".section-marketing__block", false);

    function shapeContainer(parent){
        if(!parent) return;

        let container = document.createElement("div");
        container.className = "shape-container";
        parent.prepend(container);
    }

    function generateShapes(parent, count){
        if(!parent) return;
        shapeContainer(parent);

        const shapeSize = getComputedStyle(parent).getPropertyValue('--shape-size') ? getComputedStyle(parent).getPropertyValue('--shape-size') : '160px';
        const shapeSizeInt = +(shapeSize.replace('px', ''));
        for(let i = 1; i <= count; i++ ){
            let rnd = rand(1, 5);
            let rndPosX = rand(0, parent.clientWidth/shapeSizeInt+1);
            let rndPosY = rand(0, parent.clientHeight/shapeSizeInt+1);

            let html = `<div style="left: ${rndPosX*shapeSizeInt}px; top: ${rndPosY*shapeSizeInt}px;" class="shape-effect-wrap"> <svg style="animation-delay: ${Math.random()}s" class="shape-effect shape-effect--${rnd}"><use xlink:href="#shape-${rnd}"></use></svg> </div>`;

            parent.querySelector(".shape-container").insertAdjacentHTML("beforeend", html);
        }
    }

    let prxs = document.querySelectorAll('.parallax-block');
    let prxsSlow = document.querySelectorAll('.parallax-block-slow');
    new simpleParallax(prxs, {
        scale: 1.5
    });
    new simpleParallax(prxsSlow, {
        scale: 1.3,
        overflow: false
    });

    $(window).scroll(function () {
        let scrolled = $(this).scrollTop();
        let windowHeight = $(this).height();
        /*
       * custom parallax
       * set .parallax-bg-img class - REQUIRED
       * set bg-image inline - REQUIRED
       * set data-speed="" - OPTIONAL (float number) // default 0.6
       */
        $(".parallax-bg-img").each(function(){
            let eachSpeed = $(this).data("speed") ? $(this).data("speed") : "0.6";
            let yPos = -eachSpeed*($(this).offset().top - scrolled);
            if($(this).offset().top - scrolled < 0.9*windowHeight && $(this).offset().top - scrolled > -0.9*windowHeight){
                $(this).css({ "background-position-y": yPos });
            }
        });

        transY(scrolled);
    });

    function transY(scrolled, arg='down'){
        if($(window).width() < 768) return;

        $(".translate-" + arg + "-anim").each(function(){
            let dirUp = -1;
            if(arg === 'up'){
                dirUp = 1;
            }
            eachSpeed = $(this).data("speed") ? $(this).data("speed") : "0.6";
            let yPos = dirUp*eachSpeed*($(this).offset().top - scrolled);
            $(this).css({'transform' : 'translateY(' + 0.3*yPos +'px)'});
        });
    }



    // generateShapes(document.querySelector(".section-heading__top"), 9);
    // generateShapes(document.querySelector(".section-signup"), 15);
    // generateShapes(document.querySelector(".section-info__media"), 1);
    //
    // for(let el of document.querySelectorAll(".section-marketing__block")){
    //     generateShapes(el, 2);
    // }

});

