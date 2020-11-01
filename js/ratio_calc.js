const calcRatio = () => {

    const resultRatio = (text) => document.getElementById("output_ratio").innerHTML = text;

    const mass = document.getElementById("M_ratio").value.replace(",", ".").replace("–", "-"),
        volume = document.getElementById("V_ratio").value.replace(",", ".").replace("–", "-"),
        mass_final = mass * volume / 100;

    if (mass != "" && volume != "") {
        resultRatio("Na podaną objętość przypada <b>" + Format.number(mass_final, { round: 1 }) + "g</b> herbaty.");
    }
}