import service from "../utils/request";

// 登录
export function Login(data) {
    return service({
        url:'/api/user/login',
        method:'post',
        data:data
    })
}
// 注册
export function Register(data) {
    return service({
        url:'/api/user/register',
        method:'post',
        data:data
    })
}
// 获取用户信息(测试)
export function UserInfo() {
    return service({
        url:'/api/user/id',
        method:'get',
    })
}
// 获取用户信息(实际)
// export function UserInfo(id) {
//     return service({
//         url:'/api/user'+id,
//         method:'get',
//     })
// }
//头部模糊查询(测试)
export function SearchFilm() {
    return service({
        url:'/api/film/name',
        method:'get',
    })
}
// 头部模糊查询(实际)
// export function SearchFilm(name) {
//     return service({
//         url:'/film/name'+name,
//         method:'get',
//     })
// }