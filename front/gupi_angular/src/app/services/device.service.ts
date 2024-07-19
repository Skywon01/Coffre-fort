import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {ApiService} from "./api.service";
import {lastValueFrom} from "rxjs";
import {UserModel} from "../model/user.model";
import {DeviceModel} from "../model/device.model";

@Injectable({
    providedIn: 'root',
})
export class DeviceService {
    constructor(
        private apiService: ApiService
    ) {
    }

    async getDeviceAll() {
        let res = await lastValueFrom(this.apiService.retrieveAllDevices())
        return this.formatData(res)
    }

    async getDeviceOne(id: string) {
        let res = await lastValueFrom(this.apiService.retrieveOneDevice(id))
        return this.formatData([res])
    }

    formatData(rawdata: DeviceModel[]) {
        const temp: DeviceModel[] = []

        rawdata.map((el) => {
            let tempObj: DeviceModel = new DeviceModel(el.id, el.name, el.price, el.qr_code)
            temp.push(tempObj);
        })
        // console.log('Data formatté: ', temp)
        return temp
    }
}
