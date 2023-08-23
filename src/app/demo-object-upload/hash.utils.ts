import * as CryptoJS from 'crypto-js';
import { Observable } from "rxjs";

export function computeHash(file: File): Observable<string> {
  return new Observable(obs => {
    const reader = new FileReader();

    reader.onloadend = () => {
      obs.next(CryptoJS.SHA1(byteArrayToWordArray(reader.result)).toString(CryptoJS.enc.Hex));
      obs.complete();
    }

    reader.readAsArrayBuffer(file);
  });
}

function byteArrayToWordArray(byteArray: string | ArrayBuffer | null): CryptoJS.lib.WordArray {
  if (byteArray instanceof ArrayBuffer) {
    let int8Array = new Uint8Array(byteArray);
    let wordArray: number[] | undefined = [], i;
    for (i = 0; i < int8Array.byteLength; i++) {
      wordArray[(i / 4) | 0] |= int8Array[i] << (24 - 8 * i);
    }
    return CryptoJS.lib.WordArray.create(wordArray, int8Array.byteLength);
  }
  return CryptoJS.lib.WordArray.create([], 0);
}
