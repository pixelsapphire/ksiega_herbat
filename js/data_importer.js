var temporary_data = {};
(() => {

    if (data_import_cancelled) {
        SyncTasksManager.executeSequence();
        return;
    }

    $.getJSON("https://dl.dropbox.com/s/xxzrytiqe8fifr0/tea_data.json?dl=0", data => {
        const database = Object.freeze(Object.assign({}, data));

        // Filling the navbar list with data from the JSON file
        const tea_list = selectElement("#tea-list");
        tea_list.innerHTML = "";
        (() => {
            for (const shelf_data of database.shelves) {
                // Tea collection
                if (shelf_data.id != "used_up") {
                    const category = constructElement("li", {},
                        `<a>${shelf_data.name} <i class="icon ion-md-arrow-dropdown"></i></a>`);
                    (() => {
                        const category_content = constructElement("ul", { class: "sub-menu" });
                        (() => {
                            for (const box_data of shelf_data.tea_boxes) {
                                category_content.appendChild(constructElement("li", {},
                                    `<a class="menu-closing" href="javascript:void(0)"
                                onclick="selectTea('#${shelf_data.id}', this)">${box_data.name}</a>`));
                            }
                        })();
                        category.appendChild(category_content);
                    })();
                    tea_list.appendChild(category);
                }
                // Archive
                else {
                    const used_up_list = selectElement("#used-up-list");
                    used_up_list.innerHTML = "";
                    (() => {
                        for (const box_data of shelf_data.tea_boxes) {
                            used_up_list.appendChild(constructElement("li", {},
                                `<a class="menu-closing" href="javascript:void(0)"
                                onclick="selectTea('#used_up', this)">${box_data.name}</a>`));
                        }
                    })();
                }
            }
        })();

        // Filling the collection section with data from the JSON file
        const tea_collection = selectElement("#tea-collection");
        tea_collection.innerHTML = "";
        (() => {
            for (const shelf_data of database.shelves) {
                const shelf_container = constructElement("div", { class: "shelf-container" },
                    `<div class="icons-wrapper">
                        <div class="shelf-icons">
                            <ion-icon class="left-arrow" name="chevron-back-circle"></ion-icon>
                            <ion-icon class="right-arrow" name="chevron-forward-circle"></ion-icon>
                        </div>
                    </div>`);
                (() => {
                    const shelf = constructElement("div", { class: "shelf", id: shelf_data.id });
                    (() => {
                        const tea_boxes = constructElement("div", { class: "tea-boxes" });
                        for (const box_data of shelf_data.tea_boxes) {
                            const box = constructElement("div", { class: "tea-box" });
                            (() => {
                                var rating = box_data.stars,
                                    stars = "";
                                if (__(rating))
                                    for (var i = 0; i < 5; i++) {
                                        if (rating >= 1) {
                                            stars += '<ion-icon name="star"></ion-icon>';
                                            rating--;
                                        } else if (rating >= 0.5) {
                                            stars += '<ion-icon name="star-half-outline"></ion-icon>';
                                            rating -= 0.5;
                                        } else {
                                            stars += '<ion-icon name="star-outline"></ion-icon>';
                                        }
                                    }
                                else {
                                    for (var i = 0; i < 5; i++) stars += '<ion-icon name="star-outline"></ion-icon>';
                                    stars += '<span class="no-rating">? ? ? ? ?</span>';
                                }
                                box.appendChild(constructElement(
                                    "div", { class: `ribbon ${box_data.brand_id}` }));
                                box.appendChild(constructElement("div",
                                    { class: `ribbon amount ${box_data.brand_id}`, data_amount: box_data.amount }));
                                box.appendChild(constructElement(
                                    "div", { class: `ribbon cup ${box_data.brand_id}` }));
                                box.appendChild(constructElement(
                                    "div", { class: "rating-stars" }, stars));
                                box.appendChild(constructElement(
                                    "div", { class: "photo-area" },
                                    `<img class="tea-photo" src="img/teas/${box_data.id}.jpg"
                                        onerror="loadFallbackPhoto(this)">`));
                                box.appendChild(constructElement(
                                    "div", { class: "title" },
                                    `<hr><span class="title-text">${box_data.name}</span>`));
                                box.appendChild(constructElement(
                                    "div", { class: "desc" },
                                    box_data.description.replace(/\n/g, "<br>")));
                                box.appendChild(constructElement(
                                    "div", { class: "brewing-instructions" },
                                    `<brewing-table
                                        ${_(box_data.brewing.temperature) ?
                                        `data-temp="${box_data.brewing.temperature}"` : ""}
                                        ${_(box_data.brewing.time) ?
                                        `data-time="${box_data.brewing.time}"` : ""}
                                        ${_(box_data.brewing.reuses) ?
                                        `data-reuses="${box_data.brewing.reuses}"` : ""}
                                        ${_(box_data.brewing.grams) ?
                                        `data-grams="${box_data.brewing.grams}" />` : ""}`));
                                box.appendChild(constructElement("div", {
                                    class: "tea-box-shelf-base",
                                    style: `background-color: ${shelf_data.color};`
                                }));
                                box.appendChild(constructElement("div", { class: "tea-box-shadow" }));
                            })();
                            tea_boxes.appendChild(box);
                        }
                        shelf.appendChild(tea_boxes);
                        shelf.appendChild(constructElement("div", {},
                            constructElement("div", { class: "forced-margin" })));
                    })();
                    shelf_container.appendChild(shelf);
                })();
                tea_collection.appendChild(shelf_container);
            }
        })();

        // Storing global temporary data
        temporary_data.brands_data = database.brands;

        // Launching remaining synchronous tasks after data import is completed
        SyncTasksManager.executeSequence();
    });
})();
