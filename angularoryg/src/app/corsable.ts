import * as urlRegex from 'url-regex';
import { environment } from '../environments/environment';

const defaultCorsUrl = 'https://cors-anywhere.herokuapp.com/';

/**
 * Indicates that decorated property (url) should be pe prepended with cors-anywhere service url.
 * @param useCors Whether the property should use the cors-anywhere. Uses cors-anywhere if app is running in production mode by default.
 * @param corsUrl Custom cors-anywhere service url.
 */
export function Corsable(useCors: boolean = environment.production, corsUrl: string = defaultCorsUrl): PropertyDecorator {
  return function (target: any, propertyKey: string) {
    let propertyValue;

    function getter() {
      return propertyValue;
    }

    function setter(value: string) {
      if (useCors && urlRegex({ exact: true, strict: false }).test(corsUrl)) {
        propertyValue = corsUrl + value;
      } else {
        propertyValue = value;
      }
    }

    Object.defineProperty(target, propertyKey, {
      get: getter,
      set: setter,
      enumerable: true,
      configurable: true
    });
  }
}