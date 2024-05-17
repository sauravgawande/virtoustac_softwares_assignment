import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Persons } from '../interfaces/persons';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private profiles: Persons[] = []; // Local data array

  constructor() {
    // Optionally, initialize data from a JSON file or other sources
    this.fetchInitialData();
  }

  private fetchInitialData() {
    // Fetch initial data from a JSON file or other sources
    // For demonstration, initializing with mock data
    this.profiles = [
      {
        id:"1",
        name: "Raj Sharma",
        avatar: "https://cdn.pixabay.com/photo/2017/08/30/12/45/girl-2696947_1280.jpg",
        country: "India",
        dob: "04/09/1998",
        email: "sarah.taylor@example.com"
      },
      {
        id:"2",
        name: "Varun Dhavan",
        avatar: "https://cdn.pixabay.com/photo/2020/11/06/05/33/woman-5716875_1280.png",
        country: "India",
        dob: "04/09/1988",
        email: "doller@gmail.com"
      },
      {
        id:"3",
        name: "Virat Josh",
        avatar: "https://cdn.pixabay.com/photo/2023/04/15/17/19/cat-7928232_1280.png",
        country: "India",
        dob: "04/09/2000",
        email: "john.doe@example.com"
      },
      {
        id:"4",
        name: "Poonam Pande",
        avatar: "https://cdn.pixabay.com/photo/2023/12/09/10/10/woman-8439003_1280.png",
        country: "India",
        dob: "04/09/1978",
        email: "emily.wilson@example.com"
      },
    ];
  }

  getProfiles():Observable<Persons[]> {
    return of(this.profiles);
  }

  addProfile(profile: Persons): Observable<Persons> {
    profile.id = (parseInt(this.profiles[this.profiles.length - 1].id) + 1).toString();  
    this.profiles.push(profile);
    return of(profile);
  }

  updateProfile(profile: Persons): Observable<Persons> {
    const index = this.profiles.findIndex(p => p.id === profile.id);
    if (index !== -1) {
      this.profiles[index] = profile;
      return of(profile);
    }
    return  of(profile);
  }
}

