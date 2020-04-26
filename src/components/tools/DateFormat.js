import React from 'react'
import moment from 'moment-timezone'

const DateFormat = ({date, timezone}) => {
    const d = moment.tz(date, 'GMT')
    const d2 = d.clone().tz(timezone);
    return <span> {d2.format('DD/MM/YYYY')}</span>
}

export default DateFormat;