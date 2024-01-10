import { Test, TestingModule } from '@nestjs/testing';
import assert from 'node:assert';
import { beforeEach, describe, it } from 'testing/bdd.ts';
import { AppController } from './app.controller.ts';
import { AppService } from './app.service.ts';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      assert.strictEqual(appController.getHello(), 'Hello World!');
    });
  });
});
