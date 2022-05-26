// This example required the following modules to be installed:
// npm install node-mideahvac

const appliances = require('node-mideahvac');

// Specify your specific information
const ac = appliances.createAppliance({
  communicationMethod: 'serialbridge',
  host: '<replace by the IP address of your serial bridge>',
  port: '<replace by the port of your serial bridge>'
});

// Any updated status properties will be printed
ac.on('status-update', data => {
  console.log(`Received updates: ${JSON.stringify(data)}`);
});

ac.initialize()
  .then(response => {
    console.log('Initialized, start polling');

    // The status will be polled each 30s, when properties are changed these will be emitted as a
    // status-update
    setInterval(() => {
      ac.getStatus()
        .catch(error => {
          console.log(`Error: ${error.message}`);
        });
    }, 30000);
  })
  .catch(error => {
    console.log(`Error: Failed to initialize (${error.message})`);
  });
