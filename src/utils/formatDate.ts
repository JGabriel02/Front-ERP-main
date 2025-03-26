export const useDate = () => {
    const formatDateForAPI = (value: string) => {

        const [year, month, day, time] = value.replace('T', '-').split('-')  // => ['yyyy', 'mm', 'dd', 'hh:mm']

        return `${day}/${month}/${year} ${time}`;
    }
    
    const formatAPIdate = (value: string) => {

        const [year, month, day, time] = value.slice(0, -4).replace('T', '-').split('-')  // => ['yyyy', 'mm', 'dd', 'hh:mm']

        return `${day}/${month}/${year} ${time}`;
    }

    return {
        formatDateForAPI,
        formatAPIdate
    }
}