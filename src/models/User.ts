interface IUser {
    username: string;
    email: string;
    password: string;
}

class User implements IUser {
    public password: string;
    public username: string;
    public email: string;
}