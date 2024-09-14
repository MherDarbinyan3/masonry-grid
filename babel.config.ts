import type { TransformOptions } from '@babel/core';

const config: TransformOptions = {
    presets: [
        ['@babel/preset-env', { targets: { node: 'current' } }],
        '@babel/preset-typescript',
        ['@babel/preset-react', { runtime: 'automatic' }],
    ],
};

export default config;