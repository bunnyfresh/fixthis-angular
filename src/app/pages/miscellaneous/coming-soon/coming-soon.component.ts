import { NbMenuService } from '@nebular/theme';
import { Component } from '@angular/core';

@Component({
  selector: 'ngx-coming-soon',
  styleUrls: ['./coming-soon.component.scss'],
  templateUrl: './coming-soon.component.html',
})
export class ComingSoonComponent {

  constructor(private menuService: NbMenuService) {
  }

  goToHome() {
    this.menuService.navigateHome();
  }
}
