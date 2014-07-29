var request = require('request');
var async = require('async');
var url = 'http://imagingbuddy.appspot.com';

var get_and_perform_task = function() {

	request(url + '/lease', function(err, res, body) {

		var current_runner = 1;

		var body_obj = JSON.parse(body);

		async.eachLimit(body_obj, 1, function(task_name_str, cb) {

			setTimeout(function() {

				// Get the params from the name
				var run_id = task_name_str.split('-')[0];
				var run_x = task_name_str.split('-')[1];
				var run_y = task_name_str.split('-')[2];

				// Send the info out now !
				request(url + '/update?run=' + run_id + '&x=' + run_x + '&y=' + run_y, function(err, response, body){

					current_runner++;
					cb();

				});

			}, current_runner * 1000);

		}, function() {

			setTimeout(get_and_perform_task, current_runner * 300);

		})

	});

};

get_and_perform_task();


