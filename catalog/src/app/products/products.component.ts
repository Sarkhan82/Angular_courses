import { Component } from '@angular/core';
import { Product } from '../model/product.model';
import { ProductService } from '../services/product.service';
// attention penser à faire les imports qui ne se font pas automatiquement
import { FormGroup } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent  {
  // on a déclarer Product en tant que modèle pour avoir un constructeur propre et ne pas faire n'importe quoi (typer)
  products! : Array<Product>;
  currentPage: number=0;
  pageSize: number =5;
  totalPages : number=0;
  errorMessage! : string;
  // je déclare un objet de type searchFormGroup
  searchFormGroup! : FormGroup;
  currentAction : string="all";

  // injection de dépendances pour récuperer notre service
  // Il faut rajouter au constructeur le formbuilde pour les formulaire
  constructor(private productService : ProductService, private fb : FormBuilder, public authService : AuthenticationService) {}

  // rajouter pour lancer les fonctions au démaragge
  ngOnInit(): void {
    this.searchFormGroup=this.fb.group({
      // je vais ajouter chaque champs de mon formulaire dans cet objet
      keyword : this.fb.control(null) // on va ensuite aller dans le compoponent ajouter dans la balise HTML un attribut formControlName pour les connecter
    });

    this.handleGetPageProducts();

    
}
 handleGetAllProducts() {
    // le subscribe permet de définir l'observable
    this.productService.getAllProducts().subscribe({
      // le next c'est la prochaine action
      next : (data) => {
        this.products=data;
      }, 
      // en cas d'erreur
      error : (err) => {
        this.errorMessage=err;
      }
    });
 }

 handleGetPageProducts() {
  // le subscribe permet de définir l'observable
  this.productService.getPageProducts(this.currentPage, this.pageSize).subscribe({
    // on récupère une 
    next : (data) => {
      this.products=data.products;
      this.totalPages=data.totalPages;
    }, 
    // en cas d'erreur
    error : (err) => {
      this.errorMessage=err;
    }
  });
}

 handleDeleteProduct(p: Product) {
  let conf = confirm("Are you sure ?");
  if(conf==false) return;
  this.productService.deleteProduct(p.id).subscribe(
    { next : (data) => {
    //  this.handleGetAllProducts();
    // meilleur méthode si on travail avec un back pour éviter un va et viens inutile avec le back
    let index = this.products.indexOf(p);
    this.products.splice(index, 1);
    }
    }
  )
 }

 handleSetPromotion(p: Product) {
  let promo = p.promotion;
  this.productService.setPromotion(p.id).subscribe( {
    next : (data) => {
      p.promotion =! promo;

    },
    error : (err) => {
      this.errorMessage = err;
    }
  })
 }

 handleSearchProducts() {
  this.currentAction="search";
  this.currentPage=0;
  let keyword = this.searchFormGroup.value.keyword;
  this.productService.searchProducts(keyword, this.currentPage, this.pageSize).subscribe({
    next : (data) => {
      this.products=data.products;
      this.totalPages=data.totalPages;
    }
  })
 }

 goToPage(i : number) {
  this.currentPage = i;
  this.handleGetPageProducts();
  if(this.currentAction==="all") {
    this.handleGetPageProducts();
  } else {
    this.handleSearchProducts();
  }
 }

 handleNewProduct() {
  
 }
}


