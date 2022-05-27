import service from "../utils/request";

// 显示全部客服
export function ListAllWorker() {
    return service({
        url:'/api/worker',
        method:'get',
    })
}

// 显示全部留言
export function ListAllComment() {
    return service({
        url:'/api/lm',
        method:'get',
    })
}

// 查看我的评价
export function ListMyComment() {
    return service({
        url:'/api/we',
        method:'get',
    })
}

export function PostMyComment(data) {
    return service({
        url:'/api/we',
        method:'post',
        data:data
    })
}