import Hapi from '@hapi/hapi';
import JWT from '@hapi/jwt';

export const authPlugin: Hapi.Plugin<undefined> = {
  name: 'app-auth',
  register: async function (server: Hapi.Server) {
    await server.register(JWT);

    server.auth.strategy('jwt', 'jwt', {
      keys: process.env.JWT_SECRET || 'your-secret-key',
      verify: {
        aud: false,
        iss: false,
        sub: false,
        nbf: true,
        exp: true,
        maxAgeSec: 86400,
        timeSkewSec: 15
      },
      validate: (artifacts, request, h) => {
        return {
          isValid: true,
          credentials: artifacts.decoded.payload
        };
      }
    });
  }
};
