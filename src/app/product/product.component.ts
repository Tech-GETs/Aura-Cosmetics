import { Component, OnInit } from '@angular/core';
import { ProductService } from './product.service';
import { Product } from './product.model';
import { CommonModule, NgIf } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, FormsModule, NgIf],
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  products: Product[] = [];
  showModal: boolean = false;
  editingProduct: Product | null = null;

  newProduct: Product = {
    productName: '',
    brandName: '',
    price: 0,
    ratings: 0,
    description: '',
    productType: '',
    productSubtype: '',
    imagePath1: '',
    imagePath2: '',
    imagePath3: '',
    imagePath4: ''
  };

  productTypes = ['Makeup', 'Haircare', 'Skincare', 'Fragrance'];
  productSubtypes: { [key: string]: string[] } = {
    Makeup: ['Lip', 'Face', 'Eyes'],
    Haircare: ['Shampoo', 'Conditioner', 'Serum', 'Hair Mask'],
    Skincare: ['Serum', 'Moisturiser', 'Sunscreen'],
    Fragrance: ['Perfume', 'Deodorant', 'Body Mist']
  };

  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.getProducts();
  }

  getProducts() {
    this.productService.getProducts().subscribe(data => {
      this.products = data;
    });
  }

  toggleModal() {
    console.log("1", this.showModal);
    this.showModal = !this.showModal;
    console.log("2", this.showModal);
    if (!this.showModal) {
      this.resetForm();
    }
  }

  saveProduct() {
    if (this.editingProduct) {
      // Update existing product
      this.productService.updateProduct(this.editingProduct.id!, this.newProduct).subscribe(() => {
        this.getProducts(); // Refresh product list
        this.toggleModal(); // Close modal
      });
    } else {
      // Add new product
      this.productService.addProduct(this.newProduct).subscribe(() => {
        this.getProducts(); // Refresh product list
        this.toggleModal(); // Close modal
      });
    }
  }

  editProduct(product: Product) {
    this.editingProduct = product;
    this.newProduct = { ...product }; // Populate form with product data
    this.showModal = true; // Show modal for editing
  }

  deleteProduct(id: number) {
    this.productService.deleteProduct(id).subscribe(() => {
      this.getProducts(); // Refresh product list
    });
  }

  resetForm() {
    this.newProduct = {
      productName: '',
      brandName: '',
      price: 0,
      ratings: 0,
      description: '',
      productType: '',
      productSubtype: '',
      imagePath1: '',
      imagePath2: '',
      imagePath3: '',
      imagePath4: ''
    };
    this.editingProduct = null; // Reset editing product
  }

  onFileChange(event: Event, imageIndex: number) {
    const target = event.target as HTMLInputElement;
    const files = target.files;

    if (files && files.length > 0) {
      const fileUrl = URL.createObjectURL(files[0]);
      switch (imageIndex) {
        case 1:
          this.newProduct.imagePath1 = fileUrl;
          break;
        case 2:
          this.newProduct.imagePath2 = fileUrl;
          break;
        case 3:
          this.newProduct.imagePath3 = fileUrl;
          break;
        case 4:
          this.newProduct.imagePath4 = fileUrl;
          break;
      }
    }
  }
}
