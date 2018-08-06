export interface IFicheroByteIms {
    id?: number;
    fileBytesContentType?: string;
    fileBytes?: any;
}

export class FicheroByteIms implements IFicheroByteIms {
    constructor(public id?: number, public fileBytesContentType?: string, public fileBytes?: any) {}
}
