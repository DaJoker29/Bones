$(document).ready(function() {
    $.getJSON( "../package.json", function (data) {
        version = data.version;
        $('#welcome h1 small').html('v' + version);
    });
});
