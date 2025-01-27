import { IProduct } from '../3_models/Product.js';

class CRUDProduct{
   // En mockup af en database (in memory) - se REDIS senere
   private static products: Map<number, IProduct> = new Map<number, IProduct>();
   
   private static size: number =0;

   constructor(){
      CRUDProduct.products.set(1, {'title':'milk','decription':'dairy product','price':14});
      CRUDProduct.size++;
   }

   // CRUD Create
   public static async insert(request:any, response:any){
    try{
        // (1) Vi henter body'en i http-requestet - og laver typetjek med modellen!!
        const product:IProduct = request.body;
        // lidt debug...
        console.log("produkttitlen = " + product.title);

        // (2) Vi vil finde nummeret på næste produkt som autonummer
        let no:number = CRUDProduct.size + 1; 
        // lidt debug...
        console.log("det næste produkt-id er = " + no);

        // (3) Vi indsætter det nye produkt (i mappen)
        CRUDProduct.products.set(no,product);
        
        // (4) Vi returnerer en positiv status til klienten + det indsatte produkt
        return response.status(201).json(product);
     } catch(e){
       console.error(e);
     }
   }
}
export {CRUDProduct}