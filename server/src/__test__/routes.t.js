// const request = require('supertest');
// const express = require('express');
// const router = require('../controller/index');
import { request } from 'supertest';
import express from 'express';
import router from '../controller/index';

const app = new express();
app.use('/', router);

describe('Routes testing', () => {
  test('responds to /users/:id', async () => {
    const res = await request(app).get('/users/:id');
    // expect(res.header['content-type']).toBe('text/html; charset=utf-8');
    expect(res.statusCode).toBe(200);
    expect(res.body.gmail).stringContaining('@gmail.com');
  });
});
