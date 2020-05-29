export const getTodayInSeconds = () => (
    (new Date()).getTime() / 1000 // since ms
);