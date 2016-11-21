import { Injectable } from "@angular/core";
import { BarcodeScanner } from "ionic-native";

@Injectable()
export class NativeService {
    constructor() {}
    scanCode() {
        BarcodeScanner.scan().then((barcodeData) => {
            console.log("success");
        }, (err) => {
            console.log("error");
        });
    }
}