import {logout} from "@/api/apiUser"

export default async function Logout() {
    await logout()
    window.location.href = "http://localhost:3000";
}

export const metadata = {
    title: "Logout",
    description: "Logout page",
}
