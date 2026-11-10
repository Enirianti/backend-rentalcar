const db = require("../firebaseConfig");
const userRef = db.ref("users");

const userSchema =function(user) {
        this.id = user.id || userRef.push().key;
        this.username = user.username;
        this.password = user.password;
        this.created_at = Date.now();
        this.updated_at = Date.now();
        this.is_deleted = false;
}

// User.create = async (newUser) => {
//     try{
//         const { error, value } = userSchema.validate(newUser);
//         if(error) {
//             return {
//                 status: 400,
//                 success: false,
//                 message: "Validation error",
//                 details: error.details
//             };
//         }
        
//             const dataUser = new User(data);
//             const newRef =  userRef.push();
//             dataUser.id = newRef.key;

//             await newRef.set(dataUser);
            
//             return {
//                 status: 200,
//                 success: true,
//                 message: "Insert data successfully",
//             };
//     } catch (err) {
//         return {
//             status: 500,
//             success: false,
//             message: "Internal server error",
//             error: err.message || err
//         };
//     }  
// };

// User.findall = async () => {
//     try {
//         const dataAll = await userRef.once("value");
//         const data = dataAll.val() || {};

//         const user = Object.entries(data).map(([id, data]) => {
//             return new User({id, ...data});
//         });

//         return {
//             status: 200,
//             success: true,
//             data: user
//         };
//     } catch (err) {
//         return {
//             status: 500,
//             success: false,
//             message: "Internal server error",
//             error: err.message || err
//         };
//     }  
// }

// User.findbyId = async (id) => {
//     try {
//         const dataId = await userRef.child(id).once("value");
        
//         if (!dataId.exists()) {
//             return {
//                 message: "User not found"
//             };
//         }

//         return {
//             status: 200,
//             success: true,
//             data: dataId.val()
//         };
//     } catch (err) {
//         return {
//             status: 500,
//             success: false,
//             message: "Internal server error",
//             error: err.message || err
//         };
//     }  
// }

// User.updated = async (id, data) => {
//     try {
//         data.updated_at = Date.now();
//         await userRef.child(id).update(data);

//         const updated = await this.findbyId(id);
//          return {
//             status: 200,
//             success: true,
//             data: updated
//         };
//     } catch (err) {
//         return {
//             status: 500,
//             success: false,
//             message: "Internal server error",
//             error: err.message || err
//         };
//     }  
// }

// User.deleted = async (id) => {
//     try {
//         await userRef.child(id).remove();

//         return {
//                 status: 200,
//                 success: true,
//                 message: "Delete data successfully",
//             };
//     } catch (err) {
//         return {
//             status: 500,
//             success: false,
//             message: "Internal server error",
//             error: err.message || err
//         };
//     } 
// }

module.exports = { User: userSchema, userRef };