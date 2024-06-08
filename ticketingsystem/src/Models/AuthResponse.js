

class AuthResponse{
    constructor(token, user,email,role,active){
        this.token = token;
        this.user = user;
        this.email = email;
        this.role = role;
        this.active = active;
    }
}

export default AuthResponse;