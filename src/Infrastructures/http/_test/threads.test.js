const pool = require('../../database/postgres/pool');
const UsersTableTestHelper = require('../../../../tests/UsersTableTestHelper');
const AuthenticationsTableTestHelper =
 require('../../../../tests/AuthenticationsTableTestHelper');
const container = require('../../container');
const createServer = require('../createServer');
const ServerTestHelper = require('../../../../tests/ServerTestHelper');
const CommentsTableTestHelper = require('../../../../tests/CommentsTableTestHelper');
const ThreadsTableTestHelper = require('../../../../tests/ThreadsTableTestHelper');

describe('/threads endpoint', () => {
  afterAll(async () => {
    await pool.end();
  });

  afterEach(async () => {
    await ThreadsTableTestHelper.cleanTable();
    await UsersTableTestHelper.cleanTable();
    await AuthenticationsTableTestHelper.cleanTable();
  });

  // describe('when POST /threads', () => {
  //   it('should response 201 and new threads', async () => {
  //     // Arrange
  //     const requestPayload = {
  //       title: 'Help Me to Find Good Title',
  //       body: 'I don\'t know what should I write here. Please tell me.',
  //     };
  //     const accessToken = await ServerTestHelper.getAccessToken();
  //     const server = await createServer(container);

  //     // Action
  //     const response = await server.inject({
  //       method: 'POST',
  //       url: '/threads',
  //       payload: requestPayload,
  //       headers: {
  //         Authorization: `Bearer ${accessToken}`,
  //       },
  //     });
  //     // Assert
  //     const responseJson = JSON.parse(response.payload);
  //     expect(response.statusCode).toEqual(201);
  //     expect(responseJson.status).toEqual('success');
  //     expect(responseJson.data.addedThread).toBeDefined();
  //     expect(responseJson.data.addedThread.title).toEqual(requestPayload.title);
  //     expect(responseJson.data.addedThread.id).toContain('thread-');
  //   });

  //   it('should response 400 if thread payload not contain needed property',
  //       async () => {
  //         // Arrange
  //         const requestPayload = {
  //           title: 'Help Me to Find Good Title',
  //         };
  //         const accessToken = await ServerTestHelper.getAccessToken();
  //         const server = await createServer(container);

  //         // Action
  //         const response = await server.inject({
  //           method: 'POST',
  //           url: '/threads',
  //           payload: requestPayload,
  //           headers: {
  //             Authorization: `Bearer ${accessToken}`,
  //           },
  //         });

  //         // Assert
  //         const responseJson = JSON.parse(response.payload);
  //         expect(response.statusCode).toEqual(400);
  //         expect(responseJson.status).toEqual('fail');
  //         expect(responseJson.message).toEqual('data ada yang kurang');
  //       });

  //   it('should response 400 if thread payload wrong data type', async () => {
  //     // Arrange
  //     const requestPayload = {
  //       title: 9999999999,
  //       body: 'I don\'t know what should I write here. Please tell me.',
  //     };
  //     const accessToken = await ServerTestHelper.getAccessToken();
  //     const server = await createServer(container);

  //     // Action
  //     const response = await server.inject({
  //       method: 'POST',
  //       url: '/threads',
  //       payload: requestPayload,
  //       headers: {
  //         Authorization: `Bearer ${accessToken}`,
  //       },
  //     });

  //     // Assert
  //     const responseJson = JSON.parse(response.payload);
  //     expect(response.statusCode).toEqual(400);
  //     expect(responseJson.status).toEqual('fail');
  //     expect(responseJson.message).toEqual('data type harus sesuai');
  //   });

  //   it('should response 401 if without token', async () => {
  //     // Arrange
  //     const requestPayload = {
  //       title: 'Any title please',
  //       body: 'I don\'t know what should I write here. Please tell me.',
  //     };
  //     const server = await createServer(container);

  //     // Action
  //     const response = await server.inject({
  //       method: 'POST',
  //       url: '/threads',
  //       payload: requestPayload,
  //     });

  //     // Assert
  //     const responseJson = JSON.parse(response.payload);
  //     expect(response.statusCode).toEqual(401);
  //     expect(responseJson.statusCode).toEqual(401);
  //     expect(responseJson.error).toEqual('Unauthorized');
  //     expect(responseJson.message).toEqual('Missing authentication');
  //   });
  // });

  describe('when GET /threads/{threadId}', () => {
    it('should response 200 for existing', async () => {
      // Arrange
      let payload={
        threadId:'thread-1231232',
        userId:'user-123414',
        title:'testing titttle',
      }

      await ServerTestHelper.getAccessToken(payload.userId); // just create user
      await ThreadsTableTestHelper.addThread({id:payload.threadId, title: payload.title, userId:payload.userId});
      const server = await createServer(container);
      // Action
      const response = await server.inject({
        method: 'GET',
        url: `/threads/${payload.threadId}`,
      });

      // Assert
      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(200);
      expect(responseJson.status).toEqual('success');
      expect(responseJson.data.thread).toBeDefined();
      expect(responseJson.data.thread.title).toEqual(payload.title);
      expect(responseJson.data.thread.id).toEqual(payload.threadId);
    });

    // it('should response 404 if thread not found',
    //     async () => {
    //       // Arrange
    //       const threadId = 'thread-randomly';
    //       const server = await createServer(container);

    //       // Action
    //       const response = await server.inject({
    //         method: 'GET',
    //         url: `/threads/${threadId}`,
    //       });

    //       // Assert
    //       const responseJson = JSON.parse(response.payload);
    //       expect(response.statusCode).toEqual(404);
    //       expect(responseJson.status).toEqual('fail');
    //       expect(responseJson.message).toEqual('thread tidak ada ');
    //     });

    // it('should return deleted comment correctly', async () => {
    //   // Arrange
    //   const threadId = 'thread-12345';
    //   const userId = 'user-123333';
    //   const threadTitle = 'title is good';
    //   const commentId = 'comment-1999';
    //   await ServerTestHelper.getAccessToken(userId); // just create user
    //   await ThreadsTableTestHelper.addThread({id: threadId, title: threadTitle, userId});
    //   await CommentsTableTestHelper.addComment({id: commentId, threadId, userId, isDeleted: true});
    //   const server = await createServer(container);

    //   // Action
    //   const response = await server.inject({
    //     method: 'GET',
    //     url: `/threads/${threadId}`,
    //   });

    //   // Assert
    //   const responseJson = JSON.parse(response.payload);
    //   expect(response.statusCode).toEqual(200);
    //   expect(responseJson.status).toEqual('success');
    //   expect(responseJson.data.thread).toBeDefined();
    //   expect(responseJson.data.thread.title).toEqual(threadTitle);
    //   expect(responseJson.data.thread.id).toContain('thread-');
    //   expect(responseJson.data.thread.comments).toBeDefined();
    //   expect(responseJson.data.thread.comments[0].content).toEqual('**komentar telah dihapus**');
    // });

    
  });
});
