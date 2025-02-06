export default interface ICRUD {
    Create(req: any, res: any): any
    ReadOne(req: any, res: any): any
    ReadAll(req: any, res: any): any
    Update(req: any, res: any): any
    Delete(req: any, res: any): any
}