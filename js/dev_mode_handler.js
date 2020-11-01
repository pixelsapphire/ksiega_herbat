const data_import_cancelled = devMode;
if (devMode) {
    var style = document.createElement('style');
    style.innerHTML = "#loading-cover{display:none;}";
    document.head.appendChild(style);
} else {
    if (!navigator.onLine) document.getElementById("no-internet").style.visibility = "visible";
}
const loadFallbackPhoto = imgTag => imgTag.src = "img/photo_unavailable.png";