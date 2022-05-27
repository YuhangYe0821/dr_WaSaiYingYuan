import service from "../utils/request";

// 轮播图(测试)
export function ListAllPoster() {
    return service({
        url:'/api/poster',
        method:'get',
    })
}
// // 轮播图(实际)
// export function ListAllPoster(status) {
//     return service({
//         url:'/poster?status='+status,
//         method:'get',
//     })
// }

// 正在热播(测试)
export function ListNowFilm() {
    return service({
        url:'/api/status',
        method:'get',
    })
}

//热门榜单Top1-3(测试)
export function ListHots() {
    return service({
        url:'/api/film/hot/limit',
        method:'get',
    })
}

// //热门榜单(实际)
// export function ListHots() {
//     return service({
//         url:'/api/film/hot/10',
//         method:'get',
//     })
// }
//热门榜单Top4-10(测试)
export function ListTableData() {
    return service({
        url:'/api/film/hot/tabledata',
        method:'get',
    })
}

//所有电影
export function ListAllFilm() {
    return service({
        url:'/api/film',
        method:'get',
    })
}

// 选择地区和类型来查询电影(测试)
export function FindFilmByRegionAndType() {
    return service({
        url:'/film/region/type',
        method:'get',
    })
}
// // 选择地区和类型来查询电影(实际)
// export function FindFilmByRegionAndType(region, type) {
//     return service({
//         url:'/film?region='+region+'&type='+type,
//         method:'get',
//     })
// }

// 查询电影详情(测试)
export function FindFilmById() {
    return service({
        url:'/api/film/id',
        method:'get',
    })
}
// // 查询电影详情(实际)
// export function FindFilmById(id) {
//     return service({
//         url:'/api/film/'+id,
//         method:'get',
//     })
// }

// 评分
export function AddFilmEvaluate(data) {
    return service({
        url:'/api/fe',
        method:'post',
        data:data
    })
}

// 查询电影评论
export function FindFilmComment() {
    return service({
        url:'/api/fe',
        method:'get',
    })
}

// 查询电影排片(测试)
export function FindFilmTicketById() {
    return service({
        url:'/api/arrangement/film/fid',
        method:'get',
    })
}
// // 查询电影排片(实际)
// export function FindFilmTicketById(fid) {
//     return service({
//         url:'/api/arrangement/film/{fid}',
//         method:'get',
//     })
// }

// 查询排片详情(测试)
export function FindArrangementById() {
    return service({
        url:'/api/arrangement/id',
        method:'get',
    })
}
// 查询排片详情(实际)
// export function FindArrangementById(id) {
//     return service({
//         url:'/api/arrangement/'+id,
//         method:'get',
//     })
// }

// 查询排片座位情况(测试)
export function FindArrangementSeats() {
    return service({
        url:'/api/arrangement/getSeats/id',
        method:'get',
    })
}
// // 查询排片座位情况(实际)
// export function FindArrangementSeats(id) {
//     return service({
//         url:'/api/arrangement/getSeats?id='+id,
//         method:'get',
//     })
// }
