const AddThread = require('../AddThread');

describe('a AddThread entities', () => {
  it('should throw error when payload did not contain needed property', () => {
    // Arrange
    const payload = {
      title: 'Dicoding',
    };

    // Action and Assert
     expect(() => new AddThread(payload)).toThrowError("ADD_THREAD.NOT_CONTAIN_NEEDED_PROPERTY");
  });

  it('should throw error when payload did not meet data type specification', () => {
    // Arrange
    const payload = {
      title: 123,
      body: {},
      userId:'user-klasn'
    };

    // Action and Assert
    expect(() => new AddThread(payload)).toThrowError("ADD_THREAD.NOT_MEET_DATA_TYPE_SPECIFICATION");
  });

  it('should create Thread object correctly', () => {
    // Arrange
    const payload = {
      title: 'dicoding',
      body: 'Dicoding Indonesia',
      userId:'user-lkasd'
    };

    // Action
    const addedThread = new AddThread(payload);
    
    // Assert
    expect(addedThread.title).toEqual(payload.title);
    expect(addedThread.body).toEqual(payload.body);
    expect(addedThread.userId).toEqual(payload.userId);
  });
});