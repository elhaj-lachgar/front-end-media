


// stream handler of response
async function getObjectFromRequestBodyStream(target) {
  const input = await target.getReader().read();
  const decoder = new TextDecoder();
  const string = decoder.decode(input.value);
  return JSON.parse(string);
}

// get all post
// per *
async function getPosts(page, limit) {
  const url = `http://localhost:8000/api/v1/post?page=${page || 1}&limit=${
    limit || 50
  }`;

  const response = await fetch(url);

  const result = await getObjectFromRequestBodyStream(response.body);

  console.log(result);

  return result.data;
}

// login
async function loginService(password, email) {
  const data = JSON.stringify({ password, email });

  const url = "http://localhost:8000/api/v1/auth/login";

  const header = {
    "Content-Type": "application/json",
  };

  const response = await fetch(url, {
    method: "POST",
    body: data,
    headers: header,
  });

  const result = await getObjectFromRequestBodyStream(response.body);

  console.log(result);

  const token = result.token;

  if (token) {
    window.localStorage.setItem("token", token);
    window.localStorage.setItem("user", JSON.stringify(result.data));
    delete result.token;
    return result;
  }

  return null;
}

// singup
async function Singup(password, email, profile, name, confirmpass) {
  const data = JSON.stringify({ password, email, name, profile, confirmpass });

  const url = "http://localhost:8000/api/v1/auth/singup";

  const header = {
    "Content-Type": "application/json",
  };

  const response = await fetch(url, {
    method: "POST",
    body: data,
    headers: header,
  });

  const result = await getObjectFromRequestBodyStream(response.body);

  const token = result.token;

  if (token) {
    window.localStorage.setItem("token", token);
    window.localStorage.setItem("user", JSON.stringify(result.data));
    delete result.token;
    return result;
  }

  return null;
}

// get post by id
async function GetPostById(id) {
  const url = `http://localhost:8000/api/v1/post/${id}`;

  const response = await fetch(url);

  const result = getObjectFromRequestBodyStream(response.body);

  return result;
}

// get user by id
async function GetUserById(id) {
  const url = `http://localhost:8000/api/v1/user/${id}`;

  const token = window.localStorage.getItem("token");

  if (!token) return null;

  const header = {
    authorization: `Bearer ${token}`,
    "content-type": "application/json",
  };

  const response = await fetch(url, { headers: header });

  const result = await getObjectFromRequestBodyStream(response.body);

  if (!result.data) return null;

  return result;
}

// get user posts
async function GetUserPosts() {
  const url = "http://localhost:8000/api/v1/post/myposts";

  const token = window.localStorage.getItem("token");

  if (!token) return null;

  const header = {
    authorization: `Bearer ${token}`,
    "content-type": "application/json",
  };

  const response = await fetch(url, { headers: header });

  const result = await getObjectFromRequestBodyStream(response.body);

  if (result.data) {
    return result;
  }

  return null;
}

async function GetUserSection() {
  const url = "http://localhost:8000/api/v1/message";

  const token = window.localStorage.getItem("token");

  if (!token) return null;

  const header = {
    authorization: `Bearer ${token}`,
    "content-type": "application/json",
  };

  const response = await fetch(url, { headers: header });

  const result = await getObjectFromRequestBodyStream(response.body);

  if (result.data) {
    return result;
  }

  return null;
}

async function GetMessageOfSectionById(id, respector) {
  const data = JSON.stringify({ respector });

  const url = `http://localhost:8000/api/v1/message/section/${id}`;

  const token = window.localStorage.getItem("token");

  if (!token) return null;

  const header = {
    authorization: `Bearer ${token}`,
    "content-type": "application/json",
  };

  const response = await fetch(url, {
    method: "POST",
    body: data,
    headers: header,
  });

  const result = await getObjectFromRequestBodyStream(response.body);
  
  if (result.data) {
    return result.data;
  }

  return null;
}

async function CreateMessage ( content , respector , section ) {

  const data =  JSON.stringify({content,respector});

  const url = `http://localhost:8000/api/v1/message/${section}`

  const token = window.localStorage.getItem("token");

  if (!token) return null;

  const header = {
    "authorization": `Bearer ${token}`,
    "content-type": "application/json",
  };

  const response = await fetch(url, {
    method: "POST",
    body: data,
    headers: header,
  });

  const result = await getObjectFromRequestBodyStream(response.body);

  if ( result.data) return result.data;
  
  return null;
}


async function CreatePost ( image , title , content  ){

  console.log(image , content , title)

  const url = "http://localhost:8000/api/v1/post"

  const formData = new FormData()
  formData.append('image' , image);
  formData.append('content' , content);
  formData.append('title' , title);

  
  const token = window.localStorage.getItem("token");

  if (!token) return null;


  const header = {
    // "Content-Type" : "multipart/form-data; boundary=<calculated when request is sent>",
    "authorization" : `Bearer ${token}`,
  }


  const response = await fetch( url , { method :"POST" , headers : header , body : formData });


  const result = await getObjectFromRequestBodyStream (response.body);

  if ( result.data){
    return result.data
  }

  return null;
}


async function CreateComments ( content  , postId ) {

  const data = JSON.stringify({ content , postId});

  const url = "http://localhost:8000/api/v1/comment";

  const token = window.localStorage.getItem("token");

  if (!token) return null;


  const header = {
    "Content-Type" : "application/json",
    "authorization" : `Bearer ${token}`,
  }


  const response = await fetch ( url , { method : "POST" , headers : header , body : data })

  const result = await getObjectFromRequestBodyStream( response.body );

  if (result.data) return result.data;

  return true ;
}


async function UpdatePost ( id , image , content ) {



  const url = `http://localhost:8000/api/v1/post/${id}`;


  const token = window.localStorage.getItem("token");

  if ( !token ) return null;

  const header = {
    "authorization" : `Bearer ${token}`
  }

  const formData = new FormData()
  if (image) formData.append('image' , image);
  formData.append('content' , content);

  const response = await fetch ( url , { method : "PUT" , headers : header , body : formData });

  const result = await getObjectFromRequestBodyStream ( response.body );

  console.log(result)
  if ( result.data ) return result.data;

  return null ;
}

async function DeletePost ( id ) {

  const url = `http://localhost:8000/api/v1/post/${id}`;

  const token = window.localStorage.getItem("token");

  if ( !token ) return null;

  const header = {
    "authorization" : `Bearer ${token}`
  }

  const response = await fetch ( url , { method : "DELETE" , headers : header });

  const result = await getObjectFromRequestBodyStream ( response.body );

  if ( result.message ) return result.message;

  return null ;
}



async function SearchForUser ( name ) {


  const url = `http://localhost:8000/api/v1/user?keyword=${name}`;


  const token = window.localStorage.getItem('token');

  if ( ! token ) return null ;

  const header = {
    "authorization" : `Bearer ${token}`
  };

  const response = await fetch ( url , { headers : header});

  const result = await getObjectFromRequestBodyStream ( response.body );

  if ( result.data ) return result.data ;

  return null ;

}


async function forgetpass  ( email ) {

  const url = `http://localhost:8000/api/v1/auth/forgotpassword`;

  console.log(url);

  const data = JSON.stringify({email});

  const header = {
      "Content-Type" : "application/json"
  }

  const response = await fetch ( url , { method : "POST" , body : data , headers : header });

  const result = await  getObjectFromRequestBodyStream (response.body);

  if ( result.message == "action s done" ) {
      window.localStorage.setItem('email' , email );
      return true;
  }
  return false;
}

async function verfieRestCode ( rest_code ) {

  const email  = window.localStorage.getItem('email')

  if (  email ){

      const url = `http://localhost:8000/api/v1/auth/verfiecode`;

      const data = JSON.stringify({ rest_code , email});

      const header = {
          "Content-Type" : "application/json"
      }

      const response = await fetch ( url , { method : "POST" , body : data , headers : header });

      const result = await  getObjectFromRequestBodyStream (response.body);

      
      if ( result.message == 'rest code is correct ') {
          window.localStorage.setItem('rest_code' , rest_code);
          return true;
      }
      
      return false;
  }
  return false;
}

async function  RestPassword ( newpass , confirmpass ) {

  const rest_code = window.localStorage.getItem('rest_code');
  
  const email = window.localStorage.getItem('email');
  if ( email && rest_code ){
      
      const url = `http://localhost:8000/api/v1/auth/setpassword`;

      const data = JSON.stringify({ newpass , confirmpass , email });

      const header = {
          "Content-Type" : "application/json"
      }

      const response = await fetch ( url , { method : "POST" , body : data , headers : header });

      const result = await  getObjectFromRequestBodyStream (response.body);

      
      const token = result.token ;

      if ( token ) {
          window.localStorage.clear()
          window.localStorage.setItem('token' , token);
          window.localStorage.setItem('user' ,JSON.stringify(result.data));
          return result.data;
      }
      
      return null;
  }

  return null;
}

async function DeleteComment (id , postId ) {

  const token = window.localStorage.getItem('token')

  if ( ! token ) return false ;

  const url = `http://localhost:8000/api/v1/comment/${id}`

  const data = JSON.stringify({postId});

  const header = {
    "Content-Type" : "application/json",
    "authorization" : `Bearer ${token}`
  }

  const response = await fetch ( url , { headers : header , body : data , method :"DELETE"});

  const result = await getObjectFromRequestBodyStream(response.body);

  if ( result.message == 'comments is delete ') return true;

  return false;
}


async function UpdateComment ( id , postId , content ){

  const token = window.localStorage.getItem('token');

  if ( !token ) return null;

  const url = `http://localhost:8000/api/v1/comment/${id}`

  const data = JSON.stringify({postId,content});

  const header = {
    "authorization" : `Bearer ${token}`,
    "Content-Type" : "application/json"
  }

  const response = await fetch( url , { method :"PUT" , headers : header , body : data });

  const result = await getObjectFromRequestBodyStream( response.body );

  if( result.data ) return result.data;

  return null;
}

async function GetUserProfile ( ) {

  const token = window.localStorage.getItem('token');

  if ( !token ) return null;

  const header = {
    "authorization" : `Bearer ${token}`,
    "Content-Type" : "application/json"
  }

  const url = "http://localhost:8000/api/v1/user/profile"
  const response = await fetch( url , {headers : header});

  const result = await getObjectFromRequestBodyStream(response.body);

  if ( result.data ){
    return result.data;
  }

  return null;
}

async function UpdateProfileUser ( name , email , profile ) {

  const token = window.localStorage.getItem('token');

  const per_name = JSON.parse(window.localStorage.getItem('user')).name;

  const per_email = JSON.parse(window.localStorage.getItem('user')).email;

  if ( ! token ) return null ;

  let  per_data = {};
  if ( name  && name != per_name) per_data.name = name ;
  if ( email  && email != per_email ) per_data.email = email;

  const data = JSON.stringify(per_data)

  const header = {
    "Content-Type" : "application/json",
    "authorization" : `Bearer ${token}`
  }

  const url = "http://localhost:8000/api/v1/user/profile"

  const response = await fetch( url , { method : "PUT" , headers : header , body : data })

  const result = await getObjectFromRequestBodyStream ( response.body )

  if ( result.data ){
    window.localStorage.setItem('user' , JSON.stringify(result.data));
    return result.data;
  }

  return null;
}


async function ChangePassword ( confirmpass , newpass , current_password) {

  const token = window.localStorage.getItem('token');

  if ( !confirmpass || !newpass || !current_password || !token ) return null ;

  const url =  "http://localhost:8000/api/v1/user/change-password" ;

  const header = {
    "Content-Type" : "application/json",
    "authorization" : `Bearer ${token}`
  }

  const data = JSON.stringify({confirmpass ,newpass,current_password }) ;


  const response = await fetch ( url , { method : "PUT" , headers:header,body:data });

  const result = await getObjectFromRequestBodyStream ( response.body ) ;

  if (  result.message == "password is changed , please log again" ) {
    return result
  }

  return null;
}
export {
  getObjectFromRequestBodyStream,
  getPosts,
  loginService,
  Singup,
  GetPostById,
  GetUserById,
  GetUserPosts,
  GetUserSection,
  GetMessageOfSectionById,
  CreateMessage,
  CreatePost,
  CreateComments,
  DeletePost,
  UpdatePost,
  SearchForUser,
  forgetpass,
  RestPassword,
  verfieRestCode,
  DeleteComment,
  UpdateComment,
  GetUserProfile,
  UpdateProfileUser,
  ChangePassword
};
