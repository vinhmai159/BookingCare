import { DayOfWeek } from '../../schedules/constants/index';
export const BookingServiceToken = 'BookingServiceToken';

export enum BookingStatus {
    BOOKED = 'BOOKED',
    DONE = 'DONE',
    CANCEL = 'CANCEL',
    REJECT = 'REJECT'
}

export const weekday = new Array(7);
weekday[0] = DayOfWeek.SUNDAY;
weekday[1] = DayOfWeek.MONDAY;
weekday[2] = DayOfWeek.TUESDAY;
weekday[3] = DayOfWeek.WEDNESDAY;
weekday[4] = DayOfWeek.THURSDAY;
weekday[5] = DayOfWeek.FRIDAY;
weekday[6] = DayOfWeek.SATURDAY;