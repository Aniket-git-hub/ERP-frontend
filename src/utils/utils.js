export function formatDate(date, type) {
    if (type && type === 'dd-mon-yyyy') {
        return new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: 'numeric' }).format(new Date(date))
    } else {
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
    }
}

export function convertTo12HourFormat(time24) {
    let timeSplit = time24.split(":");
    let hours = parseInt(timeSplit[0]);
    let minutes = parseInt(timeSplit[1]);
    let seconds = parseInt(timeSplit[2]);

    let time = new Date();
    time.setHours(hours);
    time.setMinutes(minutes);
    time.setSeconds(seconds);

    let formattedTime = time.toLocaleString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });

    return formattedTime;
}

export function currentDate() {
    return new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: "numeric" }).format(new Date())
}

export function formatCurrency(amount, locale = 'en-IN', showCurrencySymbol = true, currency = 'INR') {
    const options = {
        style: showCurrencySymbol ? 'currency' : 'decimal',
        currency,
        currencyDisplay: showCurrencySymbol ? 'symbol' : 'code',
    };

    return new Intl.NumberFormat(locale, options).format(amount);
}

export function getMonthRange(dateString) {
    const date = new Date(dateString);
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);

    const formattedFirstDay = formatDate(firstDay);
    const formattedLastDay = formatDate(lastDay);

    return {
        firstDay: formattedFirstDay,
        lastDay: formattedLastDay
    };
}

export function areValuesDifferent(value1, value2) {
    return value1 !== value2;
}

export function getUpdatableValue(data, selectedItem) {
    const updatedValues = {};

    for (const key in data) {
        // Check if the property exists in the selectedItem
        const selectedItemKey = mapToSelectedItemKey(key);

        if (
            selectedItem.hasOwnProperty(selectedItemKey) &&
            areValuesDifferent(selectedItem[selectedItemKey], data[key]) &&
            data[key] !== ""
        ) {
            updatedValues[key] = data[key];
        }
    }

    return updatedValues;
}

// Map keys from data to corresponding keys in selectedItem
function mapToSelectedItemKey(key) {
    const keyMappings = {
        // Add more mappings as needed
        'quantity': 'qty',
        // Example: 'dataKey': 'selectedItemKey'
    };

    return keyMappings[key] || key;
}

export function getSearchParams(searchParams) {
    const entries = Array.from(searchParams.entries());
    let value = entries.reduce((acc, a) => ((acc[a[0]] = acc[a[0]] || []).push(a[1]), acc), {});
    return value
}

export function removeSearchParams(searchParams, key, value) {
    const existingParams = getSearchParams(searchParams);
    if (existingParams[key]) {
        existingParams[key] = existingParams[key].filter(v => v !== value);
    }
    if (existingParams[key].length === 0) {
        delete existingParams[key];
    }
    return existingParams;
}

