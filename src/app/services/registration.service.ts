import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class RegistrationService {
  readonly api = 'https://api-tt-chat.danyatochka.ru/';

  httpClient = inject(HttpClient);
}
