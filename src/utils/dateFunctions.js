import { format } from "date-fns";

export const formatDate = (dueDate) => {
    if(dueDate) {
        return format(new Date(dueDate), 'MMM d, yyyy')
    }
}