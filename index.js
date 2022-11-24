const config = require('config-yml');
const app = require('./src/server');
const magic = require('./src/utils/magic');

app.listen(config.port, () => {
  magic.LogInfo(`Server running on http://localhost:${config.port}`);
});

app.on('err', (err) => {
  magic.LogDanger(err);
});
