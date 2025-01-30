interface IProduct{
    title:string;
    decription: string;
    price: number; 
    role?:string; // the user role either admin, regular
}

export {IProduct}