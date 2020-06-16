'use strict'

function getNewSentence() {
    $.get('shorten/?s=' + $('#shorten_input').val(), function(data) {
        $('#shorten_result_sentence').html(data.sentence);
        $('#shorten_result_ids').html('IDs: \n ' + data.ids.reduce((acc, current) => acc + '<br>' + current, ""));
    });
}

function getTrackerInfo() {
    $.get('info/' + $('#get_info_input').val(), function(data) {
        $('#get_info_result').html('Redirect URL: ' + data.redirectUrl + '<br> Times Used: ' + data.count);
    });
}