import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
// import Validation from './utils/validation';

@Component({
	selector: 'app-login',
	standalone: true,
	imports: [
		FormsModule,
		CommonModule
	],
	templateUrl: './login.component.html',
	styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {

	// NOTE: variables locales
	email: string = '';
	password: string = '';
	isLoading$: Observable<boolean>;

	constructor(
		private toastr: ToastrService,
		private authService: AuthService,
		public router: Router,
	) {
		this.isLoading$ = this.authService.isLoading$;
	}
	ngOnInit(): void {
		// this.showSuccess();
		this.redirectToHome();
	}

	login() {
		console.log("clic")
		if (!this.email || !this.password) {
			console.log("clic and iff ")
			this.toastr.error("Validación", "Necesitas diligenciar todos los campos");
			return;
		}

		this.authService.login(this.email, this.password)
			.subscribe((response: any) => {
				console.log("respuesta >>>> ", response)

				if (response.error && response.error.error) {
					this.toastr.error("Validación", response.error.error);
					return;
				}

				if (response) {
					console.log("bienvenido >>>> ", this.authService.currentUserValue)
					this.toastr.success('Bienvenido a la tienda virtual', 'Proceso exitoso.');
					this.router.navigate(["/"])
				}
			},
				(error) => {
					console.log(error)
				});
	}

	redirectToHome() {
        if (this.authService.token && this.authService.user) {
            this.router.navigate(['/']);
        }
	}

	showSuccess() {
		this.toastr.success('Bienvenido a la tienda virtual', 'Proceso exitoso.');
	}
}
