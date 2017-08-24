import { Component } from '@angular/core'
import { FormBuilder, FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { UserService, User } from '../shared';

@Component({
    selector: 'register-page',
    templateUrl: './register.component.html',
    styleUrls: ['./auth.component.css'],
})
export class RegisterComponent
{
    public form: FormGroup;
    public formErrors: any = {
        username: [],
        email: [],
        password: []
    };
    private validationMessages = {
        username: {
            'required':      'Name is required.',
            'minlength':     'Name must be at least 4 characters long.',
            'maxlength':     'Name cannot be more than 25 characters long.',
            'valid':         'Name not valid',
            'unique':        'Name is used'
        },
        email: {
            'required':      'Email is required.',
            'maxlength':     'Email cannot be more than 255 characters long.',
            'email':         'Email not valid',
            'unique':        'Email is used'
        },
        password: {
            'required':      'Password is required.',
            'minlength':     'Name must be at least 5 characters long.',
        }
    };

    constructor (
        private router: Router,
        private userService: UserService,
        private fb: FormBuilder
    ) {
        this.form = this.fb.group({
            username: [
                '',
                [
                    Validators.required,
                    Validators.minLength(4),
                    Validators.maxLength(25)
                ],
            ],
            email: [
                '',
                [
                    Validators.required,
                    Validators.maxLength(255),
                    Validators.email
                ]
            ],
            password: [
                '',
                [
                    Validators.required,
                    Validators.minLength(6)
                ]
            ]
        });
        this.form.valueChanges.subscribe((data: any) => this.validateForm());
    }

    private validateForm(): void {
        const form: FormGroup = this.form;

        for (const field in this.formErrors) {
            if (this.formErrors.hasOwnProperty(field)) {
                this.formErrors[field] = [];
                const control: AbstractControl = form.get(field);

                if (control && control.dirty && !control.valid) {
                    const messages: Object = this.validationMessages[field];

                    for (const key in control.errors) {
                        if (control.errors.hasOwnProperty(key)) {
                            this.formErrors[field].push(messages[key]);
                        }
                    }
                }
            }
        }
    }

    public doSubmit(): void {
        const formValid: boolean = this.checkFormIsValid();
        if(formValid == false) return;
        this.registerUser(this.form.value);
    }

    private checkFormIsValid(): boolean {
        const form: FormGroup = this.form;
        for (const field in this.formErrors) {
            if (this.formErrors.hasOwnProperty(field)) {
                const control: AbstractControl = form.get(field);

                if (control && !control.dirty) {
                    control.markAsDirty();
                }
            }
        }
        this.validateForm();
        return this.form.valid;
    }

    private registerUser(user: User): void {
        this.userService.register(user).subscribe(
            data => {
                if (data.success) {
                    this.router.navigate(['/login']);
                }
                this.parseBackendErrors(data.errors);
            }
        )
    }

    private parseBackendErrors(errors: Object): void {
        const parseErrors: Object = errors;

        for (const field in parseErrors) {
            if (parseErrors.hasOwnProperty(field)) {
                const messages: Object = this.validationMessages[field];
                this.formErrors[field] = [];

                for (const errorName of parseErrors[field]) {
                    console.log(field);
                    const control: AbstractControl = this.form.get(field);
                    control.setErrors({remote: errors});

                    this.formErrors[field].push(messages[errorName]);
                }
            }
        }
        console.log(this.formErrors);
    }
}