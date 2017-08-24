import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { SharedModule, MaterialModule } from '../shared';
import { LoginComponent } from './login.component';
import { RegisterComponent } from './register.component';

const authRouting: ModuleWithProviders = RouterModule.forChild([
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'register',
        component: RegisterComponent

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

    ]
})
export class AuthModule {}