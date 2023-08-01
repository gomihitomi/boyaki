module.exports = {
  target: 'node',
  mode: process.env.NODE_ENV ?? 'production',
  externals: [
    {
      '@nestjs/websockets/socket-module':
        'commonjs2 @nestjs/websockets/socket-module',
      '@nestjs/microservices/microservices-module':
        'commonjs2 @nestjs/microservices/microservices-module',
    },
  ],
};
