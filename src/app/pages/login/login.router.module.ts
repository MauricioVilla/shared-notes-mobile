import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoginPage } from './login.page';
import { PublicGuard } from '../../core/auth';

const routes: Routes = [
    { path: '', component: LoginPage, pathMatch: 'full', data: { title: 'Iniciar Sesión' }, canActivate: [PublicGuard]  }
];
@NgModule({
    imports: [
        RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
    ],
    exports: [RouterModule]
})
export class LoginRouterModule {}
