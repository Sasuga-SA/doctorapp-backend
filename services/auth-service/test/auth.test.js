import request from 'supertest';
import app from '../src/app.js'; // importa solo la app, sin levantar el server
import models from '../src/models/index.js';

const { Doctor } = models;

beforeAll(async () => {
  // Limpia la base y crea un doctor de prueba
  await Doctor.sync({ force: true });
  await Doctor.create({
    firstName: 'Mario',
    lastName: 'Ramírez',
    email: 'mario@example.com',
    password: await Doctor.hashPassword('123456'), // o directamente hasheado
    specialty: 'Neurología',
    phone: '555-0000',
  });
});

describe('POST /api/v1/auth/login', () => {
  it('debe loguear correctamente con credenciales válidas', async () => {
    const res = await request(app)
      .post('/api/v1/auth/login')
      .send({
        email: 'mario@example.com',
        password: '123456',
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.token).toBeDefined();
  });

  it('debe fallar si el email no existe', async () => {
    const res = await request(app)
      .post('/api/v1/auth/login')
      .send({
        email: 'noexiste@example.com',
        password: '123456',
      });

    expect(res.statusCode).toBe(404);
  });

  it('debe fallar si la contraseña es incorrecta', async () => {
    const res = await request(app)
      .post('/api/v1/auth/login')
      .send({
        email: 'mario@example.com',
        password: 'malaClave',
      });

    expect(res.statusCode).toBe(401);
  });
});
