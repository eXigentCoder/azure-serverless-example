'use strict';
module.exports = function(context, timer) {
    if (timer.isPastDue) {
        context.log('JavaScript is running late!');
    }
    context.log('Timer just ran');
};
