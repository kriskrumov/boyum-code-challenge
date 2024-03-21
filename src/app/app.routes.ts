import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { TodoDetailsComponent } from './pages/todo-details/todo-details.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';


export const routes: Routes = [
    { path: '', component: HomeComponent, children: [
        { path: 'todo/:id', component: TodoDetailsComponent},
    ]},
    { path: '**', component: PageNotFoundComponent}
];
