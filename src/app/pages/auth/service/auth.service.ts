import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
	BehaviorSubject,
	Observable,
	catchError,
	finalize,
	map,
	of,
	switchMap,
	throwError
} from 'rxjs';
import {
	PATH_AUTH_LOGIN,
	PATH_AUTH_LOGOUT,
	PATH_AUTH_REGISTER,
	URL_BACKEND_SERVICES
} from '../../../config/config';

@Injectable({
	providedIn: 'root'
})
export class AuthService {

	currentUserSubject: BehaviorSubject<any>;
	currentUser$: Observable<any>;
    isLoading$: Observable<boolean>;
    isLoadingSubject: BehaviorSubject<boolean>;

	token: string = ''
	user: any;

    get currentUserValue(): any {
        return this.currentUserSubject.value;
    }

    set currentUserValue(user: any) {
        this.currentUserSubject.next(user);
    }

	constructor(
		public router: Router,
		public http: HttpClient
	) {
		this.currentUserSubject = new BehaviorSubject<any>(undefined);
		this.currentUser$ = this.currentUserSubject.asObservable();
        this.isLoadingSubject = new BehaviorSubject<boolean>(false);
        this.isLoading$ = this.isLoadingSubject.asObservable();

		this.initAuth();
	}

	initAuth() {
		if (localStorage.getItem("token")) {
			this.user = localStorage.getItem("user") ? JSON.stringify(localStorage.getItem("user") ?? ''): null;
			this.token = localStorage.getItem("token") + ""
		}
	}

	login (email: string, password: string) {

		this.isLoadingSubject.next(true);
		let URL = `${URL_BACKEND_SERVICES}${PATH_AUTH_LOGIN}`;

		return this.http.post(URL, {
			"email":email,
			"password": password
		}).pipe(
			map((response: any) => {
				console.log("response service auth: ", response)
				const result = this.saveLocalStorage(response)
				this.currentUserSubject.next(response);
				return result;
			}),
			catchError((err) => {
				console.log("from  servicec >>> errror ", err)
				return throwError(() => (err));
				// return of(err)
			}),
			finalize(() => this.isLoadingSubject.next(false))
		)
	}

	register(data: any) {

		console.log("pre postt ::: ", data)
		this.isLoadingSubject.next(true);
		let URL = `${URL_BACKEND_SERVICES}${PATH_AUTH_REGISTER}`;

		return this.http.post(URL, data).pipe(
			map((response: any) => {
				console.log(">>> from service register :: ", response)
				this.currentUserSubject.next(response);
				return response;
			}),
			switchMap(() => this.login(data.email, data.password)),
			catchError((err) => {
				// return of(err)
				console.log("from  servicec >>> errror ", err)
				return throwError(() => (err));
			}),
			finalize(() => this.isLoadingSubject.next(false))
		)
	}

	logout() {

		const headers = {
			'Authorization': `Bearer ${this.token}`
		}

		let URL = `${URL_BACKEND_SERVICES}${PATH_AUTH_LOGOUT}`;
		this.http.post(URL, null, {headers}).pipe(
			map((response) => {

				localStorage.removeItem("token");
				localStorage.removeItem("user");

				this.token = '';
				this.user = null;

				setTimeout(() => {
					this.router.navigateByUrl("/login")
				}, 500);

			}),
			catchError((err) => {
                console.error('err', err);
                return of(undefined);
            }),
		);

	}

	saveLocalStorage(response: any): boolean {
		if (response && response.access_token) {
			localStorage.setItem("token", response.access_token);
			localStorage.setItem("user", JSON.stringify(response.user));
			return true;
		}

		return false;
	}
}
