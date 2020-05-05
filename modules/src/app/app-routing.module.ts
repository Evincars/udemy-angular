import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
  {
    path: 'elements',
    loadChildren: () =>
      // lazy loading
      import('./elements/elements.module').then((m) => m.ElementsModule),
  },
  {
    path: 'collections',
    loadChildren: () =>
      // lazy loading
      import('./collections/collections.module').then(
        (m) => m.CollectionsModule
      ),
  },
  {
    path: 'views',
    loadChildren: () =>
      // lazy loading
      import('./views/views.module').then((m) => m.ViewsModule),
  },
  {
    path: 'mods',
    loadChildren: () =>
      // lazy loading
      import('./mods/mods.module').then((m) => m.ModsModule),
  },
  { path: '', component: HomeComponent },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
