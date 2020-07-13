import { NgModule } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';
import { CategoryComponent } from '../categories/category/category.component';
import { EditScriptComponent } from './script-edit/script-edit.component';
import { ScriptComponent } from './script-view/script.component';
import { ScriptsComponent } from './script-list/script-list.component';
import { CreateScriptComponent } from './script-create/script-create.component';
import { RegistrationComponent } from '../authentication/registration/registration.component';
import { LoginComponent } from '../authentication/login/login.component';
import { DirectionComponent } from '../shared/direction/direction.component';
import { ScriptUserComponent } from './script-user/script-user.component';




const routes: Routes = [
  { path: '', redirectTo: '/scripts', pathMatch: 'full' },
  { path: 'scripts', component: ScriptsComponent },
  { path: 'registration', component: RegistrationComponent, pathMatch: 'full' },
  { path: 'login', component: LoginComponent, pathMatch: 'full' },
  { path: 'scripts/create', component: CreateScriptComponent, pathMatch: 'full' },
  { path: 'scripts/home', component: ScriptUserComponent, pathMatch: 'full' },
  { path: 'category/:CategoryId', component: CategoryComponent },
  { path: 'scripts/:ScriptId', component: ScriptComponent },
  { path: 'scripts/:ScriptId/edit', component: EditScriptComponent },
]

const routesLogin: Routes = [
  { path: 'registration', component: RegistrationComponent, pathMatch: 'full' },
  { path: 'login', component: LoginComponent, pathMatch: 'full' },
  { path: '', component: DirectionComponent, children: routes},
]

@NgModule({
  imports: [RouterModule.forRoot(routesLogin)],
  exports: [RouterModule]
})
export class ScriptModule {
}