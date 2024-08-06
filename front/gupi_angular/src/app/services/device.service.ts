import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {apiRoot, ApiService, httpoptions} from "./api.service";
import {lastValueFrom, Observable} from "rxjs";
import {UserModel} from "../model/user.model";
import {DeviceModel} from "../model/device.model";

@Injectable({
    providedIn: 'root',
})
export class DeviceService {

    constructor(
        private http: HttpClient,
    ) {
    }

    retrieveAllDevices(): Observable<any> {
        return this.http.get(`${apiRoot}/device`, httpoptions)
    }

    retrieveOneDevice(id: string): Observable<any> {
        return this.http.get(`${apiRoot}/device/${id}`, httpoptions)
    }

    retrieveDeviceById(device_id: number): Observable<any> {
        return this.http.get(`${apiRoot}/device/${device_id}`, httpoptions);
    }

    registerDevice(device: DeviceModel): Observable<DeviceModel> {
        return this.http.post<DeviceModel>(`${apiRoot}/device`, device, httpoptions)
    }


    async getDeviceAll() {
        let res = await lastValueFrom(this.retrieveAllDevices())
        return this.formatData(res)
    }

    async getDeviceOne(id: string) {
        let res = await lastValueFrom(this.retrieveOneDevice(id))
        return this.formatData([res])
    }

    formatData(rawdata: DeviceModel[]) {
        const temp: DeviceModel[] = []

        rawdata.map((el) => {
            let tempObj: DeviceModel = new DeviceModel(el.id, el.name, el.price, el.qr_code,el.category, el.user_id)
            temp.push(tempObj);
        });
        // console.log('Data formatté: ', temp)
        return temp
    }

    getDevicesByUserId(userId: number): Observable<DeviceModel[]> {
        return this.http.get<DeviceModel[]>(`${apiRoot}/device/user/${userId}`, httpoptions);
    }

    updateDevice(id: number, device: any): Observable<DeviceModel> {
        return this.http.put<DeviceModel>(`${apiRoot}/device/${id}`, device, httpoptions);
    }

    unsetDevice(device_id: number): Observable<DeviceModel> {
        return this.http.put<DeviceModel>(`${apiRoot}/device/unset/${device_id}`,{},  httpoptions);
    }

    deleteDevice(device_id: number): Observable<any> {
        return this.http.delete(`${apiRoot}/device/${device_id}`, httpoptions);
    }
}
