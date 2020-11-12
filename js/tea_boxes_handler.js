const teaBoxesHandlerTask = () => {
    // Defining all ribbon kinds
    if (_(temporary_data.brands_data))
        for (const brand_data of temporary_data.brands_data) {
            const className = brand_data.id,
                content = brand_data.name,
                primaryColor = new Color(brand_data.color);
            forAllElements(`.${className}`, (ribbon) => {
                if ($(ribbon).hasClass("cup")) ribbon.innerHTML
                    = '<span class="brewing-icons">'
                    + '<ion-icon class="cup-open" name="cafe-outline"></ion-icon>'
                    + '<ion-icon class="cup-close" name="close-outline"></ion-icon>'
                    + '</span>';
                else if ($(ribbon).hasClass("amount")) {
                    const amount = Number.parseInt(ribbon.getAttribute("data-amount"));
                    if (!isNaN(amount) && amount > 0) ribbon.innerHTML = `Ilość: ${amount}g`;
                    else ribbon.innerHTML = "Brak";
                }
                else ribbon.innerHTML = content;
                if (!document.querySelector("#ribbon-styles").innerHTML.includes(className))
                    document.querySelector("#ribbon-styles").appendChild(document.createTextNode(`
                    .ribbon.${className} {
                        background-color: ${primaryColor.rgbaNotation};
                    }
                    #used_up .ribbon.${className} {
                        background-color: ${primaryColor.lightness(30).rgbaNotation};
                    }
                    .ribbon.${className}::before, .ribbon.${className}::after {
                        border-color: ${primaryColor.lightness(-50).rgbaNotation};
                    }
                    #used_up .ribbon.${className}::before,#used_up .ribbon.${className}::after{
                        border-color: ${primaryColor.rgbaNotation};
                    }`
                    ));
            });
        }

    // Opening and closing brewing instructions when clicking on cup or cross icon
    forAllElements(".cup", (ribbon) => {
        const icons = ribbon.querySelector(".brewing-icons");
        if (_(icons)) icons.addEventListener("click", () => {
            ribbon.style.transition = "width 200ms ease";
            var teaBox = $(ribbon.parentElement);
            if (teaBox.hasClass("active")) {
                teaBox.removeClass("activated");
                setTimeout(() => teaBox.removeClass("active"), 400);
            } else {
                teaBox.addClass("active");
                setTimeout(() => teaBox.addClass("activated"), 400);
            }
            setTimeout(() => ribbon.style.transition = "", 500);
        })
    });

    // Changing font sizes of tea names to fit available space
    forAllElements(".title-text", (title) => {
        const max_width = rem(20);
        const initial_width = $(title).innerWidth();
        if (initial_width > max_width) {
            const reduction = initial_width - max_width;
            title.style.fontSize = `${(1 - reduction / initial_width) * 100}%`
            title.style.bottom = `${(reduction / initial_width) * 0.5}rem`;
        }
    });

    // Parsing instruction tables
    forAllElements(".tea-box", (tea_box) => {
        dataNode = tea_box.querySelector("brewing-table");
        if (_(dataNode)) {
            const table = document.createElement("table");
            var temperature = dataNode.getAttribute("data-temp"),
                time = dataNode.getAttribute("data-time"),
                reuses = dataNode.getAttribute("data-reuses"),
                amount = dataNode.getAttribute("data-grams"),
                amountTable = "";

            temperature = _(temperature) ? `${temperature}°C` : '?';
            if (__(time)) time += ' min';
            if (__(reuses))
                if (reuses.includes('/'))
                    reuses = `${reuses.split('/')[0]}x <span class="small"> (+${reuses.split('/')[1]} min)</span> `;
                else reuses = `${reuses}x`;

            if (_(amount)) {
                const amountData = amount.split('/'),
                    rows = amountData.length;
                for (var i = 0; i < rows; i++) {
                    const volume = amountData[i].split(':')[1];
                    amountTable += `
                        <tr>
                            ${i == 0 ?
                            `<td rowspan="${rows}"><ion-icon name="speedometer-outline"></ion-icon></td>` : ``}
                            <td>${amountData[i].split(':')[0]}g<span
                                class="small"> : ${volume < 1000 ? volume + "ml" : (volume / 1000) + "l"}</span></td>
                            ${i == 0 ? `<td rowspan="${rows}"><ion-icon name="arrow-forward-circle" class="goto-tool"
                            onclick="toggleFixed('#ratio-calc-wrapper')"></ion-icon></td>` : ``}
                        </tr>`;
                }
            }

            dataNode.parentElement.insertBefore(table, dataNode);
            table.innerHTML = `
                <tbody>
                    <tr>
                        <td><ion-icon name="thermometer-outline"></ion-icon></td>
                        <td>${temperature}</td>
                        <td><ion-icon name="arrow-forward-circle" class="goto-tool"
                            onclick="toggleFixed('#temperature-calc-wrapper')"></ion-icon></td>
                    </tr>
                    ${__(time) ? `
                        <tr>
                            <td><ion-icon name="stopwatch-outline"></ion-icon></td>
                            <td>${time}</td>
                            <td><ion-icon name="arrow-forward-circle" class="goto-tool"
                                onclick="toggleFixed('#timer-wrapper')"></ion-icon></td>
                        </tr>` : ''}
                    ${__(reuses) ? `
                        <tr>
                            <td><ion-icon name="sync-outline"></ion-icon></td>
                            <td>${reuses}</td>
                        </tr>` : ''}
                    ${amountTable}
                </tbody > `;
            const color = new Color(window.getComputedStyle(tea_box.querySelector(".ribbon")).backgroundColor);
            table.parentElement.style.borderLeftColor = color.lightness(40).rgbaNotation;
            tea_box.querySelector(".rating-stars").style.color = color.rgbaNotation;
        }
    });
};