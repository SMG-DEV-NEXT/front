import moment from "moment";

export const MomentFunctions = {
    statsDate: (e) => {
        return  moment(e).format("DD.MM.YYYY");
    }
}