import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StateService {
  private stateSubject = new BehaviorSubject({
    title: '',
    description: '',
    link: '',
    linkName: '',
  });
  state$ = this.stateSubject.asObservable();

  setState(
    state: Partial<{
      title: string;
      description: string;
      link: string;
      linkName: string;
    }>,
  ) {
    this.stateSubject.next({ ...this.stateSubject.value, ...state });
  }
}
