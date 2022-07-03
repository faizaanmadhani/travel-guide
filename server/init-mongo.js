db.createUser({
  user: "root",
  pwd: "example",
  roles: [
    {
      role: "readWrite",
      db: "my_db",
    },
  ],
});
db.createCollection("sample"); //MongoDB creates the database when you first store data in that database
