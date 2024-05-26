import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiGithubService } from '../../core/services/github.service';
import { CommonModule } from '@angular/common';
import { CardRepositoryComponent } from './components/card-repository/card-repository.component';
import { navigateUrl } from '../../shared/utils/navigate-url';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, CardRepositoryComponent],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  userNameRoute!: string;
  profile!: any;
  repositories: any = [];
  navigateUrl = navigateUrl;

   constructor(
     private activatedRoute: ActivatedRoute,
     private apiGithubService: ApiGithubService,
     private router: Router
   ) {}

   ngOnInit():void {
      this.userNameRoute = this.activatedRoute.snapshot.params["userName"];
      this.getProfile();
   }

   getProfile():void {
     if(!this.userNameRoute) return;

     this.apiGithubService.getProfileByUserName(this.userNameRoute)
       .subscribe({
        next: (res) => {
          this.profile = res;
          this.getProfileRepos();
        },
        error: (error) => {
          throw new Error(error.message)
        }
       })
   }

   getProfileRepos():void {
    this.apiGithubService.getProfileRepos(this.userNameRoute)
    .subscribe({
      next: (res) => {
        this.repositories = res.sort((a:any, b:any) => b.stargazers_count - a.stargazers_count);
      }, 
      error: (error) => {
        throw new Error(error.message);
      }
    })
   }

   get urlPage():string {
     return window.location.href;
   }

   navigateHome() {
     this.router.navigate(['']);
   }
}
