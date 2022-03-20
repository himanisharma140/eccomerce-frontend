export const signup = async user => {
    try {
        const response = await fetch('http://localhost:8000/api/signup', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
        return await response.json()
    } catch (err) {
        console.log(err)
    }
   
};

export const signin = async user => {
    try {
        const response = await fetch('http://localhost:8000/api/signin', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
        return await response.json()
    } catch (err) {
        console.log(err)
    }
   
};

// export const signout = async user => {
//     try {
//         const response = await fetch('http://localhost:8000/api/signout', {
//             method: 'POST',
//             headers: {
//                 Accept: 'application/json',
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify(user)
//         })
//         return await response.json()
//     } catch (err) {
//         console.log(err)
//     }
   
// };

export const authenticate = (data, next) => {
    if(typeof window !== 'undefined') {
        localStorage.setItem('jwt', JSON.stringify(data))
    }
    next();
}

export const signout = (data) => {
    if(typeof window !== 'undefined') {
        localStorage.removeItem('jwt')
        
        return fetch('http://localhost:8000/api/signout', {
         method: 'GET'
        })
            .then(response => {
                console.log("Signout", response)
            })
            .catch(err => console.log(err))
}
}

export const isAuthenticated = () => {
    if(typeof window == "undefined"){
        return false;
    }
    if(localStorage.getItem("jwt")){
        return JSON.parse(localStorage.getItem("jwt"))
    }
    else{
        return false
    }
}