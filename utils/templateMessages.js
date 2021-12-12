let makeMessage = (message , code) =>{
    if(code == -1) message = "unable to perform this action" ;
    if(code == -2 ) message ="user not found" ;
    return {'message' : message , 'code' : code} ;
}


module.exports = {makeMessage}