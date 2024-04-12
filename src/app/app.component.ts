import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from "./shared/footer/footer.component";
import { HeaderComponent } from "./shared/header/header.component";

declare var $: any;
declare function HOMME_INIT([]): any;

@Component({
	selector: 'app-root',
	standalone: true,
	templateUrl: './app.component.html',
	styleUrl: './app.component.scss',
	imports: [
		CommonModule,
		RouterOutlet,
		FooterComponent,
		HeaderComponent,
	]
})
export class AppComponent implements OnInit {
	title = 'ecommerce';

	constructor() {

	}

	ngOnInit(): void {
		setTimeout(() => {
		    HOMME_INIT($);
		}, 150);
		// HOMME_INIT($);

		$(window).on('load', function () {
			$("#loading").fadeOut(500);
		});
	}
}
