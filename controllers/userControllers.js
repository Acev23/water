const connection=require("../config/db");

exports.getAllUsers=(req,res)=> {
    connection.query("SELECT * FROM `water-bills`",(err,rows,fields)=>{
        if(err) throw err;
        res.json(rows);
    }
    )
}

// exports.hello=(req,res)=> {
//     res.send("Hello World")
// }


// //get(search)
// exports.getUserByID=(req,res)=> {
//    const id=req.params.id;
//    connection.query("SELECT * FROM `water-bills` WHERE id=?",[id ],(err, rows,fields)=>{
//     if(err) throw err;
//     if(rows.length>0)
//         res.json(rows)
//     else
//         res.status(404).json ({message:"404 User not Found!"})
//    })
// }

// exports.getUserByIP=(req,res)=> {
//    const ip_address=req.params.ip_address;
//    connection.query("SELECT * FROM `water-bills` WHERE ip_address=?",[ip_address],(err, rows,fields)=>{
//     if(err) throw err;
//     if(rows.length>0)
//         res.json(rows)
//     else
//         res.status(404).json ({message:"404 User not Found!"})
//    })
// }


// exports.getUserBytwo=(req,res)=> {
 
//     const ip_email=req.params.ip_email;
//    connection.query("SELECT * FROM `water-bills` WHERE (ip_address=? || email=?) ",[ip_email,ip_email],(err, rows,fields)=>{
//     if(err) throw err;
//     if(rows.length>0)
//         res.json(rows)
//     else
//         res.status(404).json ({message:"404 User not Found!"})
//    })
// }

//POST
exports.createUser = (req, res) => {
    const { meter_number, consumer_name, cubic_meters_used, total_amount, status } = req.body;
    
    // Matched the query parameters to the extracted body fields
    connection.query(
        'INSERT INTO `water-bills` (meter_number, consumer_name, cubic_meters_used, total_amount, status) VALUES (?, ?, ?, ?, ?)',
        [meter_number, consumer_name, cubic_meters_used, total_amount, status],
        (err, result) => {
            if (err) {
                console.error("Database Error:", err);
                return res.status(500).json({ error: "Failed to create bill entry" });
            }
            res.json({ message: "Water bill created successfully", id: result.insertId });
        }
    );
};

//update
exports.updateUser=(req,res)=>{
     const { meter_number, consumer_name, cubic_meters_used, total_amount, status } = req.body;
      connection.query('UPDATE `water-bills` SET meter_number=?, consumer_name=?, cubic_meters_used=?, total_amount=?,ip=?, status=?',
        [ meter_number, consumer_name, cubic_meters_used, total_amount, status],
        (err,result)=>{
            if(err) throw err;
            if(result.affectedRows>0)
                res.json({message:"User created successfully", id:result.insertId})
            else
                res.status(404).json({message:'User Not Found'})

        })      
}

exports.deleteUser=(req,res)=>{
      const id = req.body;
      connection.query('DELETE FROM `water-bills` WHERE id=?',[id],(err,result)=>{
        if(err) throw err;
          if(result.affectedRows>0)
                res.json({message:"User DELETED successfully", id:result.insertId})
            else
                res.status(404).json({message:'User Not Found'})



      })
    
}