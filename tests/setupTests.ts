import path from 'path';

import { config } from 'dotenv-flow';
config({ path: path.resolve(__dirname, '..', 'environment'), silent: true });
