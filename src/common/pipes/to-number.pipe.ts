import {Transform} from 'class-transformer';
import { isNull, isUndefined } from 'lodash';

export function ToNumber() {
    return Transform((value: any) => {
        if (isNull(value) || isUndefined(value)) {
            return value;
        }
        const valueNumber = Number(value);
        if (isNaN(valueNumber)) {
            return value;
        }
        return valueNumber;
    });
}
