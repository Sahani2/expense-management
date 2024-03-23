

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class FileUploadService {
    private uploadUrl = 'http://localhost:4200/';

    constructor(private http: HttpClient) {}

    uploadFile(formData: FormData): Observable<any> {
        return this.http.post(this.uploadUrl, formData);
    }
}
