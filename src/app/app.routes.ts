import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';

//Componentes
import { ListProductsComponent } from './components/list-products/list-products.component';
import { AddEditProductsComponent } from './components/add-edit-products/add-edit-products.component';


export const routes: Routes = [
    {path: '', component: ListProductsComponent},
    {path:'add', component: AddEditProductsComponent },
    {path:'edit/:id', component: AddEditProductsComponent },
    {path:'**', redirectTo: '', pathMatch:'full' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}