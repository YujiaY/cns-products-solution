import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatIconModule } from "@angular/material/icon";
import { MatTableModule } from "@angular/material/table";
import { MatPaginatorModule } from "@angular/material/paginator";
import { RouterModule } from "@angular/router";

import { ProductsComponent } from "./products.component";
import { ProductDetailComponent } from "./product-detail/product-detail.component";
import { MatButtonModule } from "@angular/material/button";

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MatIconModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
  ],
  declarations: [ProductsComponent, ProductDetailComponent],
})
export class ProductsModule {}
