/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable("comments", {
    id: {
      type: "VARCHAR(50)",
      primaryKey: true,
    },
    content: {
      type: "TEXT",
      notNull: true,
    },
    user_id: {
      type: "VARCHAR(50)",
      notNull: true,
    },
    thread_id: {
      type: "VARCHAR(50)",
      notNull: true,
    },
    is_deleted: {
      type: "BOOLEAN",
      notNull: true,
      default: false,
    },
  });
};

exports.down = (pgm) => {
  pgm.dropTable("comments");
};
