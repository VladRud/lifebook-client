import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { SharedModule, MaterialModule, NoAuthGuard } from '../shared';
import { LoginComponent } from './login.component';
import { RegisterComponent } from './register.component';
// import {NoAuthGuard} from '../shared/services/no-auth-guard.service';

const authRouting: ModuleWithProviders = RouterModule.forChild([
    {
        path: 'login',
        component: LoginComponent,
        canActivate: [NoAuthGuard]
    },
    {
        path: 'register',
        component: RegisterComponent,
        canActivate: [NoAuthGuard]
    }
]);

@NgModule({
    imports: [
        authRouting,
        SharedModule,
        MaterialModule,
        BrowserAnimationsModule
    ],
    declarations: [
        LoginComponent,
        RegisterComponent
    ],
    providers: [
        NoAuthGuard
    ]
})
export class AuthModule {}