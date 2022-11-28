const request = require('supertest');
const express = require('express');
const router = require('../controller/index');

const cors = require('cors');

const app = new express();

app.use('/', router);

describe('Routes testing', () => {
  it('responds to /users/:id', async () => {
    const res = await request(app).get('/users/6380d76a2d9a3a8b19572ffe');
    expect(res.statusCode).toBe(201);
    expect(res.body.info.data.gmail).toContain('@gmail.com');
  });

  it('responds to /notices', async () => {
    const res = await request(app).get('/notices');
    expect(res.statusCode).toBe(200);
    res.body.info.data.forEach((notice) => {
      expect(notice.departments).not.toHaveLength(0);
    });
  });
});
