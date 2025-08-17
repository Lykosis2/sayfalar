import AdminUser from "../../models/adminUser";
import { sendBulkEmails } from "../email/sendBulk";

const adminUser = AdminUser();

export default async function informTheAdmin(err,type) {
    console.log(err)
    
    const adminUsers = await adminUser.findAll()
    // SEND EMAIL TO ADMIN
    const emailList = adminUsers.map((item) => {
        return {
            to: item.email,
            name: "Admin",
        };
    });
    await sendBulkEmails(emailList, (item) => {
        return {
            from: '"Admin" info@lykosis.com',
            to: item.to,
            subject: "Error " + type + new Date().toISOString() + err.message,
            text: `Error ${type} ${err.message}`,
            html: `<b>${type} ${err.message}</b>`,
        };
    }
    ); 
    return
}