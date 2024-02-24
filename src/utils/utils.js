export function formatDate(date) {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
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