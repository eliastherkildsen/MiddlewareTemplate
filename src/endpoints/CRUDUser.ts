import {IUser} from "../models/User";


export class CRUDUser{

    public static map : Map<number, IUser> = new Map();
    public static mapSize = 0;



    static get(req: any, res: any) {

        const id = Number(req.params.id);

        if (CRUDUser.map.has(id)) {
            return res.status(200).json(CRUDUser.map.get(id));
        }
        return res.status(404).json({ message: "User not found" });

    }


    static getAll(req: any, res: any) {

        return res.status(200).json(Array.from(CRUDUser.map.values()));

    }


    static post(req: any, res: any) {

        const user : IUser = req.body;

        CRUDUser.map.set(CRUDUser.mapSize, user);
        CRUDUser.mapSize ++;

        console.log("Mapsize: " + CRUDUser.mapSize);
        console.table(CRUDUser.map);

        return res.json(user).status(200);

    }


    static put(req: any, res: any) {

    }

    static delete(req: any, res: any) {
        const id = Number(req.params.id);

        const result = CRUDUser.map.delete(id);
        if (result) return res.status(200).json({ message : "User deleted successfully" });
        return res.status(404).json({ message: "User not found" });

    }


}