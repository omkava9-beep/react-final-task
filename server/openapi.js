// Static OpenAPI spec describing the fake backend, served via Swagger UI at /docs.
export const openapiSpec = {
  openapi: '3.0.3',
  info: {
    title: 'ShopEase fake backend',
    version: '1.0.0',
    description:
      'Fake REST backend for users + orders, backed by db.json. Not a real database — data resets if the file is wiped or (on most free hosts) on redeploy.',
  },
  servers: [{ url: '/', description: 'Current server' }],
  tags: [
    { name: 'Users', description: 'Signup + fake login (no hashing, no real sessions)' },
    { name: 'Orders', description: 'Placing and listing orders' },
  ],
  components: {
    schemas: {
      User: {
        type: 'object',
        properties: {
          id: { type: 'string', example: 'a1b2c3d4-...' },
          name: { type: 'string', example: 'Jane Doe' },
          email: { type: 'string', example: 'jane@example.com' },
        },
      },
      NewUser: {
        type: 'object',
        required: ['name', 'email', 'password'],
        properties: {
          name: { type: 'string', example: 'Jane Doe' },
          email: { type: 'string', example: 'jane@example.com' },
          password: { type: 'string', example: 'pw123' },
        },
      },
      OrderItem: {
        type: 'object',
        properties: {
          productId: { type: 'integer', example: 1 },
          title: { type: 'string', example: 'Classic Canvas Backpack' },
          quantity: { type: 'integer', example: 2 },
          price: { type: 'number', example: 49.99 },
        },
      },
      Order: {
        type: 'object',
        properties: {
          id: { type: 'string', example: 'a1b2c3d4-...' },
          userId: { type: 'string', example: 'a1b2c3d4-...' },
          items: { type: 'array', items: { $ref: '#/components/schemas/OrderItem' } },
          total: { type: 'number', example: 99.98 },
          shipping: {
            type: 'object',
            nullable: true,
            example: { name: 'Jane Doe', address: '123 Main St', city: 'Springfield', postalCode: '12345' },
          },
          status: { type: 'string', example: 'Processing' },
          date: { type: 'string', format: 'date-time' },
        },
      },
      NewOrder: {
        type: 'object',
        required: ['userId', 'items', 'total'],
        properties: {
          userId: { type: 'string', example: 'a1b2c3d4-...' },
          items: { type: 'array', items: { $ref: '#/components/schemas/OrderItem' } },
          total: { type: 'number', example: 99.98 },
          shipping: {
            type: 'object',
            nullable: true,
            example: { name: 'Jane Doe', address: '123 Main St', city: 'Springfield', postalCode: '12345' },
          },
        },
      },
      Error: {
        type: 'object',
        properties: { error: { type: 'string' } },
      },
    },
  },
  paths: {
    '/users': {
      get: {
        tags: ['Users'],
        summary: 'List users, optionally filtered — use this for fake login',
        parameters: [
          { name: 'email', in: 'query', schema: { type: 'string' } },
          { name: 'password', in: 'query', schema: { type: 'string' } },
        ],
        responses: {
          200: {
            description: 'Matching users (password never included in the response)',
            content: {
              'application/json': {
                schema: { type: 'array', items: { $ref: '#/components/schemas/User' } },
              },
            },
          },
        },
      },
      post: {
        tags: ['Users'],
        summary: 'Sign up a new user',
        requestBody: {
          required: true,
          content: { 'application/json': { schema: { $ref: '#/components/schemas/NewUser' } } },
        },
        responses: {
          201: {
            description: 'User created',
            content: { 'application/json': { schema: { $ref: '#/components/schemas/User' } } },
          },
          400: {
            description: 'Missing fields',
            content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } },
          },
          409: {
            description: 'Email already registered',
            content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } },
          },
        },
      },
    },
    '/orders': {
      get: {
        tags: ['Orders'],
        summary: "List a user's past orders",
        parameters: [{ name: 'userId', in: 'query', schema: { type: 'string' }, required: true }],
        responses: {
          200: {
            description: 'Orders for the given userId',
            content: {
              'application/json': {
                schema: { type: 'array', items: { $ref: '#/components/schemas/Order' } },
              },
            },
          },
        },
      },
      post: {
        tags: ['Orders'],
        summary: 'Place a new order',
        requestBody: {
          required: true,
          content: { 'application/json': { schema: { $ref: '#/components/schemas/NewOrder' } } },
        },
        responses: {
          201: {
            description: 'Order created',
            content: { 'application/json': { schema: { $ref: '#/components/schemas/Order' } } },
          },
          400: {
            description: 'Missing/invalid fields',
            content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } },
          },
        },
      },
    },
  },
};
