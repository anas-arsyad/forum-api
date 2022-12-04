const GetDetailThread = require("../GetDetailThread");

describe("a AddedThread entieties", () => {
  it("should throw error when payload  did not match  needed propery", () => {
    const thread = {
      id: "thread-ajsldaisdm",
      body: "user-alnsasd",
      // title:'testing title',
    };

    expect(() => new GetDetailThread(thread)).toThrowError(
      "DETAIL_THREAD.NOT_CONTAIN_NEEDED_PROPERTY"
    );
  });

  it("should throw error when payload did not match data spesification", () => {
    const payload = {
      id: "thread-afa",
      title: "testing title",
      body: "testing body",
      username:{},
      date: "2021-08-08T07:19:09.775Z",
    };
    expect(() => new GetDetailThread(payload)).toThrowError(
      "DETAIL_THREAD.NOT_MEET_DATA_TYPE_SPECIFICATION"
    );
  });

  it("should return  object correctly", () => {
    const payload = {
      id: "thread-afa",
      title: "testing title",
      body: "testing body",
      username: "testing",
      date: "2021-08-08T07:19:09.775Z",
    };

    let detailThread = new GetDetailThread(payload);

    expect(detailThread.id).toEqual(payload.id);
    expect(detailThread.title).toEqual(payload.title);
    expect(detailThread.username).toEqual(payload.username);
    expect(detailThread.body).toEqual(payload.body);
    expect(detailThread.date).toEqual(payload.date);
  });
});
