import service from "../utils/request";

// 显示所有活动
export function ListAllActivity() {
    return service({
        url:'/api/activity',
        method:'get',
    })
}
// 报名活动
export function RegistrationActivity(data) {
    return service({
        url:'/api/registration',
        method:'post',
        data:data
    })
}