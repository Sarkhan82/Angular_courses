// va permettre de générer notre modéle pour un product et de typer tout

export interface Product {
    id : string,
    name : string;
    price : number;
    promotion : boolean;
}

export interface PageProduct {
    products : Product[];
    page : number;
    size : number;
    totalPages : number;
}