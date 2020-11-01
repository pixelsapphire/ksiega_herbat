const calcTemperature = () => {

    const resultTemperature = (text) => document.getElementById("output_temperature").innerHTML = text,
        waterDensity = (temperature) => {
            return temperature < 0 ? 0.91675 :
                0.0000000000000028 * Math.pow(temperature, 6)
                + 0.0000000000004545 * Math.pow(temperature, 5)
                - 0.0000000003456233 * Math.pow(temperature, 4)
                + 0.0000000620477090 * Math.pow(temperature, 3)
                - 0.0000081977340620 * Math.pow(temperature, 2)
                + 0.0000568201480400 * temperature
                + 0.9999000002000000;
        }

    const temperature_final = document.getElementById("T_temperature").value.replace(",", "."),
        volume_final = document.getElementById("V_temperature").value.replace(",", "."),
        temperature1 = document.getElementById("T1_temperature").value.replace(",", "."),
        temperature2 = document.getElementById("T2_temperature").value.replace(",", "."),
        mass_final = volume_final / waterDensity(temperature_final);

    var ratio;
    if (temperature1 >= 0) {
        ratio = (temperature_final - temperature1) / (temperature2 - temperature_final);
        document.getElementById("water_or_ice").innerHTML = "Zimna woda ma temperaturę:";
    } else {
        var enthalpy1 = 2100 * -temperature1 + 333700 + 4190 * temperature_final,
            enthalpy2 = 4190 * (temperature2 - temperature_final);
        ratio = enthalpy1 / enthalpy2;
        document.getElementById("water_or_ice").innerHTML = "Lód ma temperaturę:";
    }

    const mass1 = mass_final / (1 + ratio),
        mass2 = mass_final - mass1,
        volume1 = mass1 * waterDensity(temperature1),
        volume2 = mass2 * waterDensity(temperature2);

    if (isNaN(temperature_final) || temperature_final < 0 || temperature_final > 100) {
        resultTemperature("Podana wartość docelowej temperatury jest nieprawidłowa.");
    } else if (isNaN(volume_final) || volume_final < 0) {
        resultTemperature("Podana wartość objętości naczynia jest nieprawidłowa.");
    } else if (isNaN(temperature1) || temperature1 < -273.15 || temperature1 > 100) {
        resultTemperature("Podana wartość temp. " + (Number(temperature1) >= 0 ? "zimnej wody " : "lodu ") + "jest nieprawidłowa.");
    } else if (isNaN(temperature2) || temperature2 < 0 || temperature2 > 100) {
        resultTemperature("Podana wartość temp. ciepłej wody jest nieprawidłowa.");
    } else if (temperature_final != "" && volume_final != "") {
        if (Number(temperature1) > Number(temperature2)) {
            resultTemperature("Temperatury podano w odwrotnej kolejności.");
        } else if (Number(temperature1) > Number(temperature_final)
            || Number(temperature2) < Number(temperature_final)) {
            resultTemperature("Temperatura docelowa musi mieścić się w zakresie pomiędzy temperaturami składowymi.");
        } else {
            resultTemperature("Zmieszaj <b>" + (Number(temperature1) >= 0 ? Math.round(volume1) + "ml</b> zimnej" : Math.round(mass1) + "g</b> lodu") + " i <b>" + Math.round(mass2) + "ml</b> gorącej wody."
                + (volume_final == Math.round(volume1) + Math.round(volume2) || Number(temperature1) < 0 ? "" : "<br><p class=\"small\">* różnica pomiędzy sumą obliczonych objętości składowych a objętością końcową wynika z różnic w gęstości wody o różnych temperaturach</p>"));
        }
    } else {
        resultTemperature("");
    }
}