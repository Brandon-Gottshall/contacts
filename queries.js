const Pool = require("pg").Pool;

const pool = new Pool({
  user: "brandongottshall",
  host: "localhost",
  database: "contacts",
  password: "",
  port: 5432,
});

// GETs
// GET /contacts
const getContacts = (req, res) => {
  pool.query("SELECT * FROM people ORDER BY id ASC", (error, results) => {
    if (error) {
      console.error(error);
      res.status(500);
    } else {
      res.status(200).json(results.rows);
    }
  });
};
// POSTs
// POST /contacts
const postContacts = (req, res) => {
  console.log(req.body);
  const { name, email_address, age } = req.body;
  pool.query(
    "INSERT INTO people (name, email_address, age) VALUES ($1, $2, $3)",
    [name, email_address, age],
    (error, results,) => {
      if (error) {
        console.error(error);
        res.status(500);
      } else {
        res.status(201).json(results.rows)
      }
    }
  );
};

// PUTs
// DELETEs
module.exports = {
  get: {
    contacts: getContacts,
    emails: getEmails
  },
  post: {
    contacts: postContacts,
  },
};


