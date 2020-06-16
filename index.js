'use strict'

function getNewSentence() {
    $.get('shorten/?s=' + $('#shorten_input').val(), function(data) {
        $('#shorten_result_sentence').html(data.sentence);
        if(data.ids && data.ids.length > 0) {
            $('#shorten_result_ids').html('IDs: \n ' + data.ids.reduce((acc, current) => acc + '<br>' + current, ""));
        } else {
            $('#shorten_result_ids').html('No trackers generated');
        }

    }).fail(function() {
        $('#shorten_result_ids').html('Something went wrong');
    });
}

function getTrackerInfo() {
    $.get('info/' + $('#get_info_input').val(), function(data) {
        $('#get_info_result').html('Redirect URL: ' + data.redirectUrl + '<br> Times Used: ' + data.count);
    }).fail(function() {
        $('#get_info_result').html('No data found for that ID');
    });
}