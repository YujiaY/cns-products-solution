import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ProductDetailComponent } from "./products/product-detail/product-detail.component";
import { ProductsComponent } from "./products/products.component";

const routes: Routes = [
  { path: "", redirectTo: "/products", pathMatch: "full" },
  { path: "products", component: ProductsComponent },
  { path: "products/:id", component: ProductDetailComponent },
  { path: "**", redirectTo: "/products" },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
