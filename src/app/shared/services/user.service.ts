import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { User } from '../models';
import { ApiService } from './api.service';
import { JwtService } from './jwt.service';

@Injectable()
export class UserService {
    private currentUserSubject = new BehaviorSubject<User>(new User());
    public currentUser = this.currentUserSubject.asObservable().distinctUntilChanged();

    private isAuthenticatedSubject = new ReplaySubject<boolean>(1);
    public isAuthenticated = this.isAuthenticatedSubject.asObservable();

    constructor (
        private apiService: ApiService,
        private http: Http,
        private jstService: JwtService
    ) {}

    populate() {
        if (this.jstService.getToken()) {
            this.apiService.get('/user')
                .subscribe(
                    data => this.setAuth(data.user),
                    err => this.logout()
                );
        } else {
            this.logout();
        }
    }

    setAuth(user: User) {
        this.jstService.saveToken(user.token);
        this.currentUserSubject.next(user);
        this.isAuthenticatedSubject.next(true);

    }

    logout() {
        this.jstService.destroyToken();
        this.currentUserSubject.next(new User());
        this.isAuthenticatedSubject.next(false);
    }

    login(credentials: User): Observable<any> {
        return this.apiService.post('/login', credentials)
        .map(
            data => {
                console.log(data.json());
                // if(data.user.token) {
                //     this.setAuth(data.user);
                // }
                return data;
            }
        );
    }

    register(credentials: User): Observable<any> {
        return this.apiService.post('/registration', credentials)
        .map(
            data => {
                return data;
            }
        );
    }

    getCurrentUser(): User {
        return this.currentUserSubject.value;
    }

    // TODO finished method update user
    // update() {}
}