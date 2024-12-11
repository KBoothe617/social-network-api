// timestamp to export date format
export default (timestamp) => {
    const date = new Date(timestamp);
    return date.toISOString('en-US', { timeZone: 'UTC' });
};