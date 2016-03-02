'use strict';
const noble = require('noble');

noble.on('stateChange', state => {
  if (state === 'poweredOn') {
    noble.startScanning(['181d'], true);
  } else {
    noble.stopScanning();
  }
});

noble.on('discover', peripheral => {
  let serviceData = peripheral.advertisement.serviceData,
    unit = '',
    measured;
  if (serviceData && serviceData.length) {
    for (let i in serviceData) {
      if (serviceData.hasOwnProperty(i)) {
        let data = serviceData[i].data.toString('hex');
        switch (data.substr(0, 2)) {
        case '03':
          unit = 'lbs';
          break;
        case 'a3':
          unit = 'lbs';
          break;
        case '12':
          unit = 'jin';
          break;
        case 'b2':
          unit = 'jin';
          break;
        case '22':
          unit = 'kg';
          break;
        case 'a2':
          unit = 'kg';
          break;
        default:
          unit = '';
          break;
        }
        measured = parseInt(data.slice(4, 6) + data.slice(2, 4), 16) * 0.01;
        measured = unit === 'kg' ? measured / 2 : measured;
        if (unit) {
          console.log(measured + ' ' + unit);
        }
      }
    }
  }
});
