'use strict';

let service = false;

module.exports = async function() {
    if (service) {
        return 'Service Existed!';
    }
    return new Promise(resolve => {
        setTimeout(() => {
            service = true;
            resolve('Service Created!');
        }, 5000);
    });
};
