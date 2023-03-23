const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "contacts",
  password: "123",
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

// GET /contacts/:id
const getContact = (req, res) => {
  const id = parseInt(req.params.id);
  pool.query( "SELECT * FROM people WHERE id = $1", [id], (error, results) => {
    if (error) {
      console.error(error);
      res.status(500);
    } else {
      res.status(200).json(results.rows);
    }
  })
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
        res.status(201).send('Success!')
      }
    }
  );
};

// PUTs
const updateContact = (req,res) =>{
  let {name, email_address, age, id} = req.body;
  // Use a promise to request the existing data
  let myPromise = new Promise(function(resolve,reject){
    pool.query("SELECT * FROM people WHERE id=$1", [id], (error,results)=>{
      if(error){
        throw error
      } else if (res){
        // if an item doesn't have given data, set it with the existing data.
        name = name !== undefined ? name : results.rows.name;
        email_address = email_address !== undefined ? email_address : results.rows.email_address;
        age = age !== undefined ? age : results.rows.age;
        resolve(results.rows)
        return results.rows
      } else {
        reject()
      }
    })
  })
  myPromise.then(()=>{
    try{
      
      pool.query('UPDATE people SET name=$1, email_address=$2, age=$3 WHERE id = $4', 
      [name, email_address, age, id],
      (error,results)=>{
        console.log(results)
        if(error){
          throw error;
        }
        res.status(201).json(results.rows);
      })
    }
    catch(error){
      throw error;
    }
  })
}


// DELETEs
const deleteContact = (request, response)=>{
  const id=parseInt(request.params.id);
  pool.query(`DELETE FROM people WHERE id = ${id}`, (error, results)=>{
    if(error){
      throw error;
    }
    response.status(200).json(results.rows);
  })
}

module.exports = {
  get: {
    contacts: getContacts,
    contact: getContact
  },
  post: {
    contacts: postContacts,
  },
  delete: {
    contact: deleteContact
  },
  update: {
    contact: updateContact
  }
};


