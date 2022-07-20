module.exports = {
    objLoop: (obj) => {
        const objVals = [];

        for (const key in obj) {
            objVals.push(obj[key]);
        }

        return objVals;
    },

    dateFormat: (date) => {
        return date.toLocaleDateString();
    }
}