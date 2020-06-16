'use strict'

function getNewSentence() {
    $.get('shorten/?s=' + $('#shorten_input').val(), function(data) {
        $('#shorten_result_sentence').html(data.sentence);
        $('#shorten_result_ids').html(data.ids);
    });
}

function getTrackerInfo() {
    $.get('info/' + $('#get_info_input').val(), function(data) {
        $('#get_info_result').text('Redirect URL: ' + data.redirectUrl + '\n Times Used: ' + data.count);
    });
}