const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2');

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const app = express();

app.use(cors());
app.use(bodyparser.json());

//****************** DATABASE ************************************************************************ */

//database connection
// const db = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: '',
//   database: 'simpledb',
//   port: 3306
// });

// const db = mysql.createConnection({
//   host: 'sql12.freesqldatabase.com',
//   user: 'sql12626408',
//   password: 'v4bNrbZeaH',
//   database: 'sql12626408',
//   port: 3306
// });

const db = mysql.createConnection({
  host: 'database-1.cci0uk25xtmw.us-east-1.rds.amazonaws.com',
  user: 'admin',
  password: 'admin123#',
  database: 'darma',
  port: 3306
});


//Check database connection
db.connect(err => {
  if (err) {
    console.log(err, 'DB Error');
  }
  console.log('Database connected');
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});

//****************** DATABASE ************************************************************************ */



//************************************** MEMBERS TABLE********************************************** */

//Members table


//Get All data
app.get('/members', (req, res) => {

  console.log("Fetch all user data");
  let select_qr = `select * from members`;
  db.query(select_qr, (err, result) => {

    if (err) {
      console.log(err, 'err')
    }

    if (result.length > 0) {
      res.send({
        message: 'All user data',
        data: result
      });
    }

  });
});

//Get user data based on email
app.post('/members/search', (req, res) => {
  let eMail = req.body.email;

  console.log("Fetch specific user data");
  let single_user_qr = `select id from members where email = '${eMail}'`;
  db.query(single_user_qr, (err, result) => {

    if (err) {
      console.log(err, 'err')
    }

    if (result.length > 0) {
      res.send({
        message: 'User data retreived',
        data: result
      });
    }
    else {
      res.send({
        status: false,
        message: 'No user data found',
      });
    }

  });
});


//Get user data based on unit, mobile, firstname or last name (Search feature)
app.post('/members/searchAll', (req, res) => {
  let searchText = req.body.searchText;

  console.log("Search based on the search text");
  let search_qr = `select * from members where unit = '${searchText}' OR mobile LIKE '%${searchText}%' OR firstname LIKE '%${searchText}%' OR lastname LIKE '%${searchText}%' `;
  // console.log(search_qr);
  db.query(search_qr, (err, result) => {

    if (err) {
      console.log(err, 'err')
    }

    // console.log(result, "#result")
    if (result.length > 0) {
      res.send({
        message: 'Searched data fetched sucessfully',
        data: result
      });
    }
    else {
      res.send({
        message: 'No data found',
      });
    }

  });
});

//Get single user based on his ID
app.get('/profile/:id', (req, res) => {

  let gID = req.params.id;
  let id_qr = `select * from members where id = ${gID}`;

  console.log("Search user based on his ID");
  db.query(id_qr, (err, result) => {

    if (err) {
      console.log(err, 'err')
    }

    if (result.length > 0) {
      res.send({
        message: 'Get single data',
        data: result
      });
    }
    else {
      res.send({
        message: 'No data found'
      })
    }

  });

});

//Insert into members table
app.post('/profile', (req, res) => {
  console.log("Create members");

  let firstName = req.body.firstName;
  let lastName = req.body.lastName;
  let address = req.body.address;
  let associationUnit = req.body.associationUnit;
  let department = req.body.department;
  let mobileNo = req.body.mobileNo;
  let smobileNo = req.body.smobileNo;
  let landlineCode = req.body.landlineCode;
  let landlineNo = req.body.landlineNo;
  let email = req.body.email;
  let dateOfBirth = req.body.dateOfBirth;
  let spouseName = req.body.spouseName;
  let spouseDOB = req.body.spouseDOB;
  let maleChildren = req.body.maleChildren;
  let femaleChildren = req.body.femaleChildren;
  let notes = req.body.notes;

  let insert_qr = `insert into members (firstname, lastname, address, unit, department, mobile, smobile, landcode, landline, email, dob, spouse, sdob, male, female, notes) values ('${firstName}', '${lastName}', '${address}',
    '${associationUnit}', '${department}', '${mobileNo}', '${smobileNo}', '${landlineCode}', '${landlineNo}', '${email}', '${dateOfBirth}', '${spouseName}', '${spouseDOB}', '${maleChildren}',
    '${femaleChildren}', '${notes}')`;

  db.query(insert_qr, (err, result) => {

    if (err) {
      console.log(err, 'err')
    }

    res.send({
      message: 'User details inserted'
    })

  });

});



// Update member data
app.put('/profile/:id', (req, res) => {

  let gID = req.params.id;
  let firstName = req.body.firstName;
  let lastName = req.body.lastName;
  let address = req.body.address;
  let associationUnit = req.body.associationUnit;
  let department = req.body.department;
  let mobileNo = req.body.mobileNo;
  let smobileNo = req.body.smobileNo;
  let landlineCode = req.body.landlineCode;
  let landlineNo = req.body.landlineNo;
  let email = req.body.email;
  let dateOfBirth = req.body.dateOfBirth;
  let spouseName = req.body.spouseName;
  let spouseDOB = req.body.spouseDOB;
  let maleChildren = req.body.maleChildren;
  let femaleChildren = req.body.femaleChildren;
  let notes = req.body.notes;

  console.log("Update members");
  let update_qr = `update members set firstname = '${firstName}', lastname = '${lastName}', address = '${address}',    unit = '${associationUnit}', department = '${department}', mobile = '${mobileNo}', smobile = '${smobileNo}', landcode = '${landlineCode}', landline = '${landlineNo}', email = '${email}', dob = '${dateOfBirth}',  spouse = '${spouseName}', sdob = '${spouseDOB}', male = '${maleChildren}', female = '${femaleChildren}', notes = '${notes}' where id =${gID}`;

  db.query(update_qr, (err, result) => {

    if (err) {
      console.log(err, 'err')
    }

    res.send({
      message: 'User details updated'
    })


  });

});



//Delete single data
app.delete('/profile/:id', (req, res) => {

  let qID = req.params.id;

  let id_qr = `select mobile from members where id = ${qID}`;
  db.query(id_qr, (err, result) => {

    if (err) {
      console.log(err, 'err')
    }
    console.log(result);
    let data = result;

    let qr = `delete from members where id = '${qID}'`;

    console.log("Delete member data");
    db.query(qr, (err, result) => {

      if (err) {
        console.log(err, 'err')
      }
      else {

        console.log(data[0].mobile);
        // Delete from users table.
        let qr = `delete from users where phone = '${data[0].mobile}'`;
        db.query(qr, (err, result) => {
          if (err) {
            console.log(err, 'err')
          }
          else {
            res.send({
              message: 'User deleted successfully.. Refresh the page to reflect the changes'
            })
          }
        });
      }

    });




  });



});


//************************************** MEMBERS TABLE********************************************** */



//************************************** USERS TABLE********************************************** */


//Login component
app.post('/login', (req, res) => {

  let email = req.body.email;
  let password = req.body.password;

  // checkemailid
  let chkemailid = `select * from users where email = '${email}' OR phone = '${email}'`;
  db.query(chkemailid, async (err, result) => {
    if (err) throw err;
    console.log(result, "#result");
    if (result.length > 0) {
      let data = {
        name: result[0].name,
        email: result[0].email,
      };
      //    check password
      let chkpwd = await bcrypt.compare(password, result[0].password);
      console.log(chkpwd, "chkpwd##");
      if (chkpwd === true) {
        const token = jwt.sign({ data }, "privatkey");
        console.log(token, "token##");
        res.send({
          status: true,
          token: token,
          result: data,
          msg: "User Login Successful",
        });
      } else {
        res.send({
          status: false,
          msg: "Invalid User",
        });
      }
    } else {
      res.send({
        status: false,
        msg: "Invalid Email ID",
      });
    }
  });
});

//Reset password

app.put("/reset-password", (req, res) => {
  let email = req.body.email;
  let password = req.body.password;
  let newpassword = req.body.newpassword;

  //Validate the old password
  let chk_email_mob_query = `select * from users where email = '${email}' || phone = '${email}'`;
  db.query(chk_email_mob_query, async (err, result) => {
    if (err) throw err;
    console.log(result, "#result");
    if (result.length > 0) {
      let data = {
        name: result[0].name,
        email: result[0].email,
        phone: result[0].phone,
      };

      //    check password
      let chkpwd = await bcrypt.compare(password, result[0].password);
      console.log(chkpwd, "chkpwd##");

      if (chkpwd === true) {
        const token = jwt.sign({ data }, "privatkey");
        console.log(token, "token##");

        // Insert new password
        // password decrypt
        decryptpwd = await bcrypt.hash(newpassword, 10);

        // insert data
        console.log("Update into users")
        let updateqry = `update users set password = '${decryptpwd}' where phone ='${result[0].phone}' `;
        console.log(updateqry);
        db.query(updateqry, (err, result) => {
          if (err) throw err;
          res.send({
            status: true,
            msg: "Password updated successfully!",
          });
        });

      } else {
        res.send({
          status: false,
          msg: "Invalid Password, Try again..",
        });
      }
    }
    else {

      res.send({
        status: false,
        msg: "Invalid Email or Phone number, Try again..",
      });
    }

  });

});

//Admin Reset password

app.put("/reset", (req, res) => {
  let email = req.body.email;
  let phone = req.body.phone;
  let password = req.body.password;

  // first check email id already exit
  let namechkqry = `select * from users where email = '${email}' || phone ='${phone}' `;
  console.log(namechkqry);
  db.query(namechkqry, async (err, result) => {

    if (err) throw err;
    if (result.length > 0) {
      //Reset with default password if its an admin
      // password decrypt
      decryptpwd = await bcrypt.hash(password, 10);
      // update users data
      console.log("Update users with default password");
      let updateqry = `update users set password = '${decryptpwd}' where phone ='${phone}' `;
      console.log(updateqry);
      db.query(updateqry, (err, result) => {
        if (err) throw err;
        res.send({
          status: true,
          msg: "Password updated successfully",
        });
      });
    }
  });

});

//   //Validate the old password
//   let chk_email_mob_query = `select * from users where email = '${email}' OR phone = '${email}'`;
//   db.query(chk_email_mob_query, async (err, result) => {
//     if (err) throw err;
//     console.log(result, "#result");
//     if (result.length > 0) {
//       let data = {
//         name: result[0].name,
//         email: result[0].email,
//         phone: result[0].phone,
//       };

//       //    check password
//       let chkpwd = await bcrypt.compare(password, result[0].password);
//       console.log(chkpwd, "chkpwd##");

//       if (chkpwd === true) {
//         const token = jwt.sign({ data }, "privatkey");
//         console.log(token, "token##");

//         // Insert new password
//         // password decrypt
//         decryptpwd = await bcrypt.hash(newpassword, 10);

//         // insert data
//         console.log("Update into users")
//         let updateqry = `update users set password = '${decryptpwd}' where name ='${name}' `;
//         console.log(updateqry);
//         db.query(updateqry, (err, result) => {
//           if (err) throw err;
//           res.send({
//             status: true,
//             msg: "Password updated successfully",
//           });
//         });

//       } else {
//         res.send({
//           status: false,
//           msg: "Invalid Password, Try again..",
//         });
//       }
//     }
//     else {

//       res.send({
//         status: false,
//         msg: "Invalid Email or Phone number, Try again..",
//       });
//     }

//   });

// });



//signup 

app.post("/signup", (req, res) => {
  const name = req.body.name;
  const phone = req.body.phone;
  const email = req.body.email;
  const password = req.body.password;
  // check if the mobile no exists
  console.log("Insert users");
  let mobchkqry = `select phone from users where phone LIKE '%${phone}%' `;
  // console.log(mobchkqry);
  db.query(mobchkqry, async (err, result) => {
    if (err) throw err;
    // check mobile no already exits
    if (result.length > 0) {
      res.send({
        status: false,
        msg: "Mobile no exists",
      });
    }
    else if (email != '') {
      // first check email id already exit
      let emailchkqry = `select email from users where email = '${email}' `;
      db.query(emailchkqry, async (err, result) => {
        if (err) throw err;
        // check email id already exits
        if (result.length > 0) {
          res.send({
            status: false,
            msg: "Email ID already exists",
          });
        }
        else {
          // password decrypt
          decryptpwd = await bcrypt.hash(password, 10);
          // insert into users table
          let insertqry = `insert into users(name,phone,email,password) values('${name}','${phone}','${email}','${decryptpwd}') `;

          db.query(insertqry, (err, result) => {
            if (err) throw err;
            res.send({
              status: true,
              msg: "User Registered Successfully",
            });
          });
        }
      });
    }
    else {
      // password decrypt
      decryptpwd = await bcrypt.hash(password, 10);
      // insert data
      let insertqry = `insert into users(name,phone,email,password) values('${name}','${phone}','${email}','${decryptpwd}') `;

      db.query(insertqry, (err, result) => {
        if (err) throw err;
        res.send({
          status: true,
          msg: "User Registered Successfully",
        });
      });
    }

  });


});






//searchUsers
app.post("/users/searchAll", (req, res) => {
  const name = req.body.name;
  const phone = req.body.phone;
  const email = req.body.email;
  // check if the mobile no exists
  let userschkqry = `select phone, email from users where phone LIKE '%${phone}%' OR email = '${email}'`;
  console.log("Search user based on phone and email");
  db.query(userschkqry, async (err, result) => {
    if (err) throw err;
    // check mobile no already exits
    if (result.length > 0) {
      res.send({
        message: 'User data fetched',
        data: result
      });
    } else {
      res.send({
        status: false,
        msg: "No record exists",
      });
    }
  });
});


//update users
app.put("/users/updateUser", (req, res) => {
  const phone = req.body.phone;
  const email = req.body.email;

  let qr = `update users set email = '${email}' where phone='${phone}'`;
  db.query(qr, (err, result) => {
    if (err) {
      console.log(err, 'err')
    }

    res.send({
      message: 'User details updated'
    })
  });

});


//************************************** USERS TABLE********************************************** */



// requiredtoken
function requiredtoken(req, res, next) {
  let headers = req.headers["token"];
  console.log(headers, "token##");
  if (typeof headers !== undefined && headers !== "") {
    req.token = headers;
    next();
  } else {
    res.send({
      status: false,
      msg: "token required ...",
    });
  }
}
