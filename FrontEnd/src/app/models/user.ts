export class User {
    username : string = '';
    userid : string = 'empty';
    email : string = '';
    profession : string = '';
    gender : string = '';
    mobile : string = '';
    address : string = '';
    password : string = '';
    confirmPassword?: string; // ✅ Add this for client-side validation only

    constructor() {}
}
