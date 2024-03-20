import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-check-box',
  standalone: true,
  imports: [],
  templateUrl: './check-box.component.html',
  styleUrl: './check-box.component.css'
})
export class CheckBoxComponent {
  @Input() isChecked: Boolean = false;
}
