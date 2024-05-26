import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";
import { navigateUrl } from "../../../../shared/utils/navigate-url";

@Component({
    selector: 'card-repository',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './card-repository.component.html',
    styleUrls: ['./card-repository.component.scss'],
  })
  export class CardRepositoryComponent {
    @Input() repository!: any;
    navigateUrl = navigateUrl;
  }