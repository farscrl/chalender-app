export const rmLocale = {
    name: 'rm', // name String
    weekdays: 'dumengia_glindesdi_mardi_mesemna_gievgia_venderdi_sonda'.split('_'), // weekdays Array
    weekdaysShort: 'du_Gl_ma_me_gie_ve_so'.split('_'), // OPTIONAL, short weekdays Array, use first three letters if not provided
    weekdaysMin: 'du_Gl_ma_me_gie_ve_so'.split('_'), // OPTIONAL, min weekdays Array, use first two letters if not provided
    weekStart: 1, // OPTIONAL, set the start of a week. If the value is 1, Monday will be the start of week instead of Sunday。
    yearStart: 4, // OPTIONAL, the week that contains Jan 4th is the first week of the year.
    months: 'schaner_favrer_mars_avrigl_matg_zercladur_fanadur_avust_settember_october_november_december'.split('_'), // months Array
    monthsShort: 'schan_favr_mars_avr_matg_zercl_fan_avust_sett_oct_nov_dec'.split('_'), // OPTIONAL, short months Array, use first three letters if not provided
    ordinal: (n: number) => `${n}avel`, // ordinal Function (number) => return number + output
    formats: {
        // abbreviated format options allowing localization
        LTS: 'H:mm:ss',
        LT: 'H:mm',
        L: 'DD-MM-YYYY',
        LL: 'MMMM D, YYYY',
        LLL: 'MMMM D, YYYY h:mm A',
        LLLL: 'dddd, MMMM D, YYYY h:mm A',
        // lowercase/short, optional formats for localization
        l: 'D/M/YYYY',
        ll: 'D MMM, YYYY',
        lll: 'D MMM, YYYY h:mm A',
        llll: 'ddd, MMM D, YYYY h:mm A'
    },
    relativeTime: {
        // relative time format strings, keep %s %d as the same
        future: 'in %s', // e.g. in 2 hours, %s been replaced with 2hours
        past: '%s ago',
        s: 'a few seconds',
        m: 'a minute',
        mm: '%d minutes',
        h: 'an hour',
        hh: '%d hours', // e.g. 2 hours, %d been replaced with 2
        d: 'a day',
        dd: '%d days',
        M: 'a month',
        MM: '%d months',
        y: 'a year',
        yy: '%d years'
    },
    meridiem: (hour: number, minute: number, isLowercase: boolean) => {
        // OPTIONAL, AM/PM
        return hour > 12 ? 'PM' : 'AM'
    }
}
