import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css']
})
export class NewProductComponent {
  productFormGroup! : FormGroup;

  constructor(private fb : FormBuilder, public prodService : ProductService) {}

  ngOnInit(): void {
    this.productFormGroup = this.fb.group( {
      name : this.fb.control(null, [Validators.required, Validators.minLength(4)]),
      price : this.fb.control(null, [Validators.required, Validators.min(100)]),
      promotion : this.fb.control(false, [Validators.required])
    })
  }

  handleAddProduct() {
    let product = this.productFormGroup.value;
    this.prodService.addNewProduct(product).subscribe({
      next : (data) => {
        alert("Products added successfully");
        this.productFormGroup.reset();
      }, error : err => {
        console.log(err);
        
      }
    })

  }


}
