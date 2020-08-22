import path from 'path';

import { config } from 'dotenv-flow';
config({ path: path.resolve(__dirname, '..', 'environment'), silent: true });

import { app } from './app';

app.listen(4000, () => {
  console.log('app listening on port 4000');
});
