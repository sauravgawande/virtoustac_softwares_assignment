import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as countries from 'countries-list';
import { Persons } from 'src/app/interfaces/persons';
import * as CryptoJS from 'crypto-js';
import { ProfileService } from 'src/app/services/profile.service';
import { v4 as uuidv4 } from 'uuid';
import { DatePipe } from '@angular/common';
import * as moment from 'moment';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-profile-form',
  templateUrl: './profile-form.component.html',
  styleUrls: ['./profile-form.component.scss']
})
export class ProfileFormComponent {
  countriesList: any[];
  item!: Persons;
  today: string = new Date().toISOString().split('T')[0];
  buttonName:string='';
  title:string='';
  selectedFile: File | null = null;
  constructor(private route: ActivatedRoute , private router: Router, private profileService : ProfileService,private datePipe: DatePipe,private snackBar: MatSnackBar) {
    const allCountries = Object.values(countries.countries);
    const currentCountry = "India"; 
    this.countriesList = allCountries.filter(country => country.name !== currentCountry); 
    this.countriesList.unshift(allCountries.find(country => country.name === currentCountry)!);
  }
  


  ngOnInit(): void {
    if (this.router.url.startsWith('/edit')) {
    this.route.queryParams.subscribe(params => {
      const encryptedItem = params['item'];
      const decryptedBytes = CryptoJS.AES.decrypt(encryptedItem, 'secret');
      const decryptedItemString = decryptedBytes.toString(CryptoJS.enc.Utf8);
      this.item = JSON.parse(decryptedItemString);
      this.item.dob = moment( this.item.dob, 'DD/MM/YYYY').toDate();
    });
   this.buttonName = 'Update';
   this.title = 'Update Record'
    }else{
      this.item = {
        id:'',
        name: '',
        email: '',
        dob: '',
        avatar: '',
        country: ''
      };
      this.buttonName = 'Submit';
      this.title = 'Create New Record'
    }
   
  }
  

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {     
        this.item.avatar = e.target.result;    
      };
      reader.readAsDataURL(file);
    }
  }
  
  formatDate(event: any) {
    this.item.dob = this.datePipe.transform(this.item.dob, 'dd/MM/yyyy');
  }
  onSubmit(){
    if (this.isEmptyField(this.item.name) || this.isEmptyField(this.item.email) || this.isEmptyField(this.item.dob) || this.isEmptyField(this.item.country) ) {
      this.openSnackBar('Please fill out all fields');
      return;
    }

  if(this.buttonName !== 'Submit'){
    if(this.item.avatar == null || this.item.avatar == ''){
      this.item.avatar = 'https://cdn.pixabay.com/photo/2024/01/13/00/46/raccoon-8504925_1280.png';
    }
    this.profileService.updateProfile(this.item).subscribe(item =>{
      this.openSnackBar('Updated success');
      this.router.navigate(['/home']);
    })
  }else{
    this.item.id = uuidv4();
    if(this.item.avatar == null || this.item.avatar == ''){
      this.item.avatar = 'https://cdn.pixabay.com/photo/2024/01/13/00/46/raccoon-8504925_1280.png';
    }
    this.profileService.addProfile(this.item).subscribe(item =>{
      this.openSnackBar('Saved success');
      this.router.navigate(['/home']);
      
    })
  }
    
  }



  isEmptyField(value: any): boolean {
    return value === undefined || value === null || value === '';
  }
  
  openSnackBar(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 2000,
    });
  }

}
