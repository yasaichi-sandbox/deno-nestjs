import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import {
  afterEach,
  beforeEach,
  describe,
  it,
} from 'https://deno.land/std@0.210.0/testing/bdd.ts';
import { ClientRequest } from 'node:http';
import request from 'supertest';
import { AppModule } from '../src/app.module.ts';

// NOTE: Delete this patch when the following issue is resolved:
// https://github.com/denoland/deno/issues/18316
ClientRequest.prototype.setNoDelay = function (noDelay) {
  this.socket?.setNoDelay?.(noDelay);
};

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    await app.listen(0); // `0` means to choose a random port
  });

  afterEach(async () => {
    await app.close(); // NOTE: Needed for passing the sanitizer checks
  });

  it('/ (GET)', async () => {
    await request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });
});
