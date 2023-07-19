import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ApiService } from 'src/app/services/api.service';
import { InputResponse } from 'src/app/models/input-response';
import { Router } from '@angular/router';


@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent {

  user: any;
  fligths: any[]=[];
    

  constructor(private authService: AuthService,
    private apiService: ApiService,
    private router: Router) {
    }

  ngOnInit(): void {
    this.user = this.authService.getUser(); // Obtener los datos del usuario desde el servicio


    this.apiService.getPastFligths(this.user.id).subscribe((flight: InputResponse[]) => {
      this.fligths=flight;
    });

  }

  onLogout(){
    this.authService.deleteUser();
    this.router.navigate(['/']);
  }

}
