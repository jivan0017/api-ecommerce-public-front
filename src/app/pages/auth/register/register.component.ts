import { Component, OnDestroy, OnInit } from '@angular/core';
import {
	FormBuilder,
	FormControl,
	FormGroup,
	Validators,
	FormsModule,
	ReactiveFormsModule,
	AbstractControl,

} from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { ConfirmPasswordValidator } from './confirm-password.validator';
import { CommonModule } from '@angular/common';

@Component({
	selector: 'app-register',
	standalone: true,
	imports: [
		FormsModule,
		CommonModule,
		ReactiveFormsModule,

	],
	templateUrl: './register.component.html',
	styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit, OnDestroy {

	defaultAuth: any = {
		email: 'jaime@test.com',
		password: '12345678',
	};
	registrationForm: FormGroup = new FormGroup({
		surname: 	new FormControl(''),
		name:	 	new FormControl(''),
		username: 	new FormControl(''),
		email: 		new FormControl(''),
		password:  	new FormControl(''),
		cPassword: 	new FormControl(''),
		phone: 		new FormControl(''),
		avatar: 	new FormControl(''),
		agree: 		new FormControl(true),
	  });

	hasError: boolean = false;
	submitted = false;
	isLoading$: Observable<boolean>;

	// private fields
	private unsubscribe: Subscription[] = []; // Read more: => https://brianflove.com/2016/12/11/anguar-2-unsubscribe-observables/

	constructor(
		private fb: FormBuilder,
		private authService: AuthService,
		private route: ActivatedRoute,
		private router: Router
	) {
		this.isLoading$ = this.authService.isLoading$;

		// redirect to home if already logged in
		if (this.authService.currentUserValue) {
			this.router.navigate(['/']);
		}
	}
	ngOnDestroy(): void {
		throw new Error('Method not implemented.');
	}

	ngOnInit(): void {
		this.initForm();
	}

	// convenience getter for easy access to form fields
	get form() {
		return this.registrationForm.controls;
	}

	initForm() {
		this.registrationForm = this.fb.group(
			{
				name: [
					'',
					Validators.compose([
						Validators.required,
						Validators.minLength(3),
						Validators.maxLength(100),
					]),
				],
				surname: [
					'',
					Validators.compose([
						Validators.required,
						Validators.minLength(3),
						Validators.maxLength(250),
					]),
				],
				username: ['test', null],
				email: [
					'qwe@qwe.qwe',
					Validators.compose([
						Validators.required,
						Validators.email,
						Validators.minLength(3),
						Validators.maxLength(320), // https://stackoverflow.com/questions/386294/what-is-the-maximum-length-of-a-valid-email-address
					]),
				],
				phone: [
					'',
					Validators.compose([
						Validators.required,
					]),
				],
				avatar: ['test', null],
				password: [
					'',
					Validators.compose([
						Validators.required,
						Validators.minLength(3),
						Validators.maxLength(100),
					]),
				],
				cPassword: [
					'',
					Validators.compose([
						Validators.required,
						Validators.minLength(3),
						Validators.maxLength(100),
					]),
				],
				agree: [true, Validators.compose([Validators.required])],
			},
			{
				validator: ConfirmPasswordValidator.MatchPassword,
			}
		);
	}

	submit() {
		// this.hasError = false;
		this.submitted = true;

		if (this.registrationForm.invalid) {
		  return;
		}

		console.log(JSON.stringify(this.registrationForm.value, null, 2));
	}
}
