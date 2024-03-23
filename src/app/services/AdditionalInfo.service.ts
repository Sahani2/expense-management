import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class AdditionalInfoService {
    private static readonly ADDITIONAL_INFO_KEY = 'additional_info';

    constructor() {}

    getAdditionalInfo(): any {
        return JSON.parse(localStorage.getItem(AdditionalInfoService.ADDITIONAL_INFO_KEY) || '{}');
    }

    saveAdditionalInfo(info: any): void {
        localStorage.setItem(AdditionalInfoService.ADDITIONAL_INFO_KEY, JSON.stringify(info));
    }
}
