import Hapi from '@hapi/hapi';
import { startConsumer } from "./rabbit/consumer";
import { userRoutes } from './routes/user.routes';
import { authRoutes } from "./routes/auth.routes";

const init = async () => {
  const server = Hapi.server({
    port: 3000,
    host: 'localhost'
  });

  server.route([
    {
      method: 'GET',
      path: '/',
      handler: (request, h, err) => {
        return "hello world";
      }
    }
  ])

  server.route(userRoutes);
  server.route(authRoutes);

  await startConsumer('user-created')

  await server.start();
  console.log(`🚀 Server running at: ${server.info.uri}`);
};

process.on('unhandledRejection', (err) => {
  console.error(err);
  process.exit(1);
});

init();
