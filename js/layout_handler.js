// Refresing parallax background mirrors
const refreshParallax = () => {
    $('.parallax-background').parallax('destroy');
    setInterval(() => {
        $('.parallax-background').parallax();
        rellax.refresh();
    }, 100);
};

// Toggles element's "fixed" class
const toggleFixed = element => $(element).toggleClass('fixed');

// Animated scrolling
const animScrollToElement = (element, callback = void (0)) => {
    const position = $(selectElement(element)).offset().top - rem(2.5),
        animDuration = Math.min(Math.floor(Math.pow(Math.abs(window.pageYOffset - position), 0.925)), 2500);
    $("html, body").stop().animate({ scrollTop: position }, animDuration, 'swing', callback);
}

// Scrolls window and corresponding shelf to selected tea box
const selectTea = (group, anchor) => {
    animScrollToElement(group, () => $(group).stop().animate({
        scrollLeft: rem(18 + $(anchor.parentElement).index() * 32) - vw(50)
    }, 1000, 'swing'));
};

const layoutHandlerTask = () => {

    // Changes elements classes based on scroll position to change their appearance
    const manipulate_classes = () => {
        if ($(this).scrollTop() >= vh(100) - rem(5)) {
            $("#navbar-container").addClass("fixed");
        } else {
            $("#navbar-container").removeClass("fixed");
        }
    };
    // Closes all tool wrappers
    const close_all = () => forAllElements(".tool-wrapper", (wrapper) => $(wrapper).removeClass("fixed"));

    // Determining initial appearance
    manipulate_classes();
    // Scroll event
    $(window).scroll(manipulate_classes);

    // Adding selection-blocking attributes
    selectElement("#title-panel").setAttribute("unselectable", "on");
    selectElement("#title-panel").setAttribute("onselectstart", "return false;");
    applyAttributeToElements("flavor-text", "unselectable", "on");
    applyAttributeToElements("flavor-text", "onselectstart", "return false;");
    applyAttributeToElements("initial", "unselectable", "on");
    applyAttributeToElements("initial", "onselectstart", "return false;");
    applyAttributeToElements("readmore", "unselectable", "on");
    applyAttributeToElements("readmore", "onselectstart", "return false;");
    applyAttributeToElements("readless", "unselectable", "on");
    applyAttributeToElements("readless", "onselectstart", "return false;");
    applyAttributeToElements("tea-photo", "unselectable", "on");
    applyAttributeToElements("tea-photo", "onselectstart", "return false;");
    applyAttributeToElements("no-rating", "unselectable", "on");
    applyAttributeToElements("no-rating", "onselectstart", "return false;");

    // Adding an opening in new tab attribute to source links
    applyAttributeToElements("source-link", "target", "_blank");

    // Opening and closing nav in narrow mode when clicking on menu icon
    selectElement(".menu-icons").addEventListener("click", () => $("nav").toggleClass("active"));
    // Closing nav in narrow mode when clicking on a link
    addClickListenerToElements(".menu-closing", () => {
        $("nav").removeClass("active");
        close_all();
    });

    // Refresing parallax on document height change
    addClickListenerToElements(".readmore", refreshParallax);
    addClickListenerToElements(".readless", refreshParallax);

    // Closing tool window when any place outside of it is clicked
    addClickListenerToElements(".tool-wrapper", (event) => {
        if ($(event.target).hasClass("tool-area")) close_all();
    });

    refreshParallax();
};

// Removing the loading screen when page loading is completed
const loadingComplete = () => {
    setTimeout(() => {
        selectElement("#loading-cover").style.transition = "all 600ms ease";
        selectElement("#loading-cover").style.visibility = "hidden";
        selectElement("#loading-cover").style.opacity = "0";
        setTimeout(() => {
            selectElement("#loading-cover").remove();
            document.body.style.overflowY = "auto";
        }, 600);
    }, 600);
    temporary_data = undefined;
}