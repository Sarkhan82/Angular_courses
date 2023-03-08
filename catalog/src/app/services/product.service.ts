import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { PageProduct, Product } from '../model/product.model';
import { UUID } from 'angular2-uuid';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private products! : Array<Product>;

  constructor() { 
    this.products = [
      {id: UUID.UUID(), name: "Computer", price : 2500, promotion : true},
      {id: UUID.UUID(), name: "Printer", price : 500, promotion : false},
      {id: UUID.UUID(), name: "Smartphone", price : 1200, promotion : true},
    ];

    for(let i = 0; i < 10; i++) {
      this.products.push({id: UUID.UUID(), name: "Computer", price : 2500, promotion : true});
      this.products.push({id: UUID.UUID(), name: "Printer", price : 500, promotion : false});
      this.products.push({id: UUID.UUID(), name: "Smartphone", price : 1200, promotion : true})
    }
  }

  // Angular est en programation réactive donc l'idéale est de retourner un Observable (Design Patterns)
  public getAllProducts() : Observable<Array<Product>> {
    let rnd = Math.random();
    if(rnd<0.1) return throwError(() => Error("Internet connexion error"));
    // Le Of permet de retourner sous forme d'Observable
    else return of(this.products);
  }

  // à finir 2h21 de la vidéo
 /* public getPageProducts(page : number, size : number) : Observable<PageProduct> {
    let rnd = Math.random();
    if(rnd<0.1) return throwError(() => Error("Internet connexion error"));
    else return of(this.products);
  } */

  public deleteProduct(id : string) : Observable<boolean> {
    this.products = this.products.filter(p => p.id != id);
    return of(true);
  }

  public setPromotion(id : string) : Observable<boolean> {
    let product = this.products.find( p => p.id==id);
    if(product != undefined) {
      product.promotion =! product.promotion;
      return of(true)
    } else return throwError( () => new Error("Product not found"));
  }

  public searchProducts(keyword : string) : Observable<Product[]> {
    let products = this.products.filter( p => p.name.includes(keyword));
    return of(products);
  }
}
