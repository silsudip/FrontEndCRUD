import * as React from 'react';
import { Button, makeStyles, mergeClasses } from '@fluentui/react-components';
import { DatePicker } from "@fluentui/react-datepicker-compat";

import {
    CalendarCancel24Filled,
} from "@fluentui/react-icons";
import styles from './OnDemand.module.scss';
import Utils from '../services/Utils';

export interface ICustomDateFeildProps {
    date: Date | null | undefined;
    onChangeDateVal: (date: Date | null | undefined) => void;
    disabled?: boolean;
}

const useStyles = makeStyles({
    control: {
        minWidth: "320px",
    },
    clearControl: {
        float: 'left'
    },
    // clearControlButton: {
    //     paddingTop: '30px'
    // }

})
const CustomDateFeild: React.FunctionComponent<ICustomDateFeildProps> = ({ date, onChangeDateVal, disabled = false }) => {
    const inlineStyles = useStyles();
    const onDateFromString = React.useCallback(
        (newValue: string): Date => {
            const previousValue = date || new Date();
            const newValueParts = (newValue || '').trim().split('/');
            const day =
                newValueParts.length > 0 ? Math.max(1, Math.min(31, parseInt(newValueParts[0], 10))) : previousValue.getDate();
            const month =
                newValueParts.length > 1
                    ? Math.max(1, Math.min(12, parseInt(newValueParts[1], 10))) - 1
                    : previousValue.getMonth();
            let year = newValueParts.length > 2 ? parseInt(newValueParts[2], 10) : previousValue.getFullYear();
            if (year < 100) {
                year += previousValue.getFullYear() - (previousValue.getFullYear() % 100);
            }
            return new Date(year, month, day);
        },
        [date],
    );
    return (
        <div className={`${styles.Horizontal}`}>
            <div className={inlineStyles.clearControl}>
                <DatePicker
                    // isRequired={isRequired === undefined ? false : isRequired}
                    placeholder="Select a date..."
                    // ariaLabel="Select a date"
                    // label={label}
                    value={date}
                    parseDateFromString={onDateFromString}
                    onSelectDate={onChangeDateVal}
                    formatDate={Utils.getFormatDate}
                    disabled={disabled}
                    className={inlineStyles.control}
                />

            </div>
            <div className={mergeClasses(inlineStyles.clearControl)}>
                <Button title='Clear date' appearance='transparent' icon={<CalendarCancel24Filled />} onClick={() => { onChangeDateVal(undefined) }} disabled={disabled}></Button>
            </div>
        </div>

    );
}

export default CustomDateFeild;