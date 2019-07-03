import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'perfil',
        children: [
          {
            path: '',
            loadChildren: '../perfil/perfil.module#Tab1PageModule'
          }
        ]
      },
      {
        path: 'boards',
        children: [
          {
            path: '',
            loadChildren: '../boards/boards.module#Tab2PageModule'
          }
        ]
      },
      {
        path: '',
        redirectTo: '/tabs/boards',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
