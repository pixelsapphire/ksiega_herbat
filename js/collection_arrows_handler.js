collectionArrowsHandlerTask = () => {
    addClickListenerToElements(".left-arrow", (event) =>
        $(event.target.parentElement.parentElement.parentElement.querySelector(".shelf")).animate(
            { scrollLeft: "-=" + rem(64) }, 500, 'swing'));
    addClickListenerToElements(".right-arrow", (event) =>
        $(event.target.parentElement.parentElement.parentElement.querySelector(".shelf")).animate(
            { scrollLeft: "+=" + rem(64) }, 500, 'swing'));
    forAllElements(".shelf", (shelf) => {
        const wrapper = shelf.parentElement.querySelector(".icons-wrapper"),
            left_arrow = shelf.parentElement.querySelector(".left-arrow"),
            right_arrow = shelf.parentElement.querySelector(".right-arrow");
        const set_arrows_visibility = () => {
            if ($(shelf).scrollLeft() == 0) {
                left_arrow.style.visibility = "hidden";
                left_arrow.style.opacity = "0";
            } else {
                left_arrow.style.visibility = "visible";
                left_arrow.style.opacity = "1";
                wrapper.style.display = "block";
            }
            if ($(shelf).scrollLeft() == shelf.scrollWidth - vw(100)) {
                right_arrow.style.visibility = "hidden";
                right_arrow.style.opacity = "0";
            } else {
                right_arrow.style.visibility = "visible";
                right_arrow.style.opacity = "1";
                wrapper.style.display = "block";
            }
        }
        const hide_arrows = () => {
            left_arrow.style.transition = "none";
            right_arrow.style.transition = "none";
            left_arrow.style.visibility = "hidden";
            right_arrow.style.visibility = "hidden";
            wrapper.style.display = "none";
        }
        const manage_arrows = () => {
            if (shelf.scrollWidth > vw(100)) {
                $(shelf).scroll(() => {
                    set_arrows_visibility();
                });
            } else {
                hide_arrows();
            }
        }
        manage_arrows();
        $(this).resize(manage_arrows);
    });
};