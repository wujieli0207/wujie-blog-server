import { existsSync } from 'fs';
import { resolve } from 'path';

const isProd = process.env.NODE_ENV === 'production';

function parseEnv() {
  const localEnv = resolve('.env');
  const prodEnv = resolve('.env.prod');

  if (!existsSync(localEnv) && !existsSync(prodEnv)) {
    throw new Error('缺少配置环境文件');
  }

  const filePath: string = isProd && existsSync(prodEnv) ? prodEnv : localEnv;

  return {
    path: filePath,
  };
}

export default parseEnv();
