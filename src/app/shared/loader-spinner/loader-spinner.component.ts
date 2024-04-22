import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Observable, Subscription  } from 'rxjs';

@Component({
  selector: 'app-loader-spinner',
  standalone: true,
  imports: [
	CommonModule,
  ],
  templateUrl: './loader-spinner.component.html',
  styleUrl: './loader-spinner.component.scss'
})
export class LoaderSpinnerComponent {

	@Input() isLoading$: Observable<boolean> | undefined;

	constructor() {
		this.isLoading$?.subscribe(data => {
			console.log(">>> ", data)
		})
	}
}
