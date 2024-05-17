import { Pipe, PipeTransform } from '@angular/core';
import { Persons } from '../interfaces/persons';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(persons: Persons[], searchText: string): Persons[] {
    if (!persons || !searchText) {
      return persons;
    }
    searchText = searchText.toLowerCase();
    return persons.filter(person => person.name.toLowerCase().includes(searchText));
  }
}
