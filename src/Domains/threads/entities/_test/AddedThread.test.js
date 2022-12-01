const AddedThread = require('../AddedThread');

describe('a AddedThread entities', () => {
  it('should throw error when payload did not contain needed property', () => {
    // Arrange
    const payload = {
      title: 'Dicoding',
    };

    // Action and Assert
    expect(() => new AddedThread(payload)).toThrowError("ADDED_THREAD.NOT_CONTAIN_NEEDED_PROPERTY");
  });

  it('should throw error when payload did not meet data type specification', () => {
    // Arrange
    const payload = {
      title: 123,
      body: {},
    };

    // Action and Assert
    expect(() => new AddedThread(payload)).toThrowError("ADDED_THREAD.NOT_MEET_DATA_TYPE_SPECIFICATION");
  });

  it('should create Thread object correctly', () => {
    // Arrange
    const payload = {
      title: 'dicoding',
      body: 'Dicoding Indonesia',
    };

    // Action
    const addedThread = new AddedThread(payload);
    
    // Assert
    expect(addedThread.title).toEqual(payload.title);
    expect(addedThread.body).toEqual(payload.body);
  });
});