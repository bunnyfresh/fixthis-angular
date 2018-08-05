import { Component, Input } from '@angular/core';

@Component({
  selector: 'ngx-status-card',
  styleUrls: ['./status-card.component.scss'],
  template: `
    <nb-card>
      <div class="icon-container">
        <div class="icon {{ type }}">
          <ng-content></ng-content>
        </div>
      </div>

      <div class="details">
        <div class="status">{{ title }}</div>
        <b><div class="title">{{ text }}</div></b>
      </div>
    </nb-card>
  `,
})
export class StatusCardComponent {

  @Input() title: string;
  @Input() type: string;
  @Input() text: string;
}
