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

  constructor(private fb : FormBuilder, private prodService : ProductService) {}

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

  getErrorMessage(field: string, error : ValidationErrors) {
    if(error['required']) {
      return field + " is required";
    } else if(error['minlength']) {
      return field + " should have at least " + error['minlength']["requiredLength"] + " characters";
    } else if(error['min']) {
        return field + " should have a min value of " + error['min']["min"];
    } else return "";
  }

}
