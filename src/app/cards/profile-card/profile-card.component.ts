
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Persons } from 'src/app/interfaces/persons';
import { ProfileService } from 'src/app/services/profile.service';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-profile-card',
  templateUrl: './profile-card.component.html',
  styleUrls: ['./profile-card.component.scss']
})
export class ProfileCardComponent {
  personLists!: Persons[]; 
  searchText: string = '';
  
  constructor(private profileService: ProfileService ,private router: Router) {}

  ngOnInit(): void {
    
    this.loadProfiles();
  }

  loadProfiles(): void {
    this.profileService.getProfiles().subscribe(data => {
      this.personLists = data;
    });
  }

  editProfile(item: Persons): void {
    const itemString = JSON.stringify(item);
    const encryptedItem = CryptoJS.AES.encrypt(itemString, 'secret').toString();
    this.router.navigate(['/edit', item.id], { queryParams: { item: encryptedItem } });
  }
  

  addProfile(){
    this.router.navigate(['/create']);
  }
  deleteProfile(id:any){
    this.profileService.deleteProfile(id).subscribe(res=>{
      console.log(res);
      
    })
  }
}