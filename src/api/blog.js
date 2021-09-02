import request from "./request";

/**
 * 获取列表数据
 * @param {当前页码} page 
 * @param {页容量} limit 
 * @param {所属分类，-1表示全部} categoryid 
 * @returns 
 */
export async function getBlogs (page = 1 , limit = 10, categoryid = -1){
    return await request.get("/api/blog",{
        params:{    //地址栏参数
            page,
            limit,
            categoryid
        }
    }) 
};

/**
 * 获取分类
 * @returns 
 */
export async function getBlogcatagories(){  
    return await request.get("/api/blogtype")
}

//获取文章详情
export async function getBlog (id){
    return await request.get(`/api/blog/${id}`)
}

//提交评论
export async function postComment (commentInfo){
    return await request.post("/api/comment",commentInfo)
}

//获取评论
export async function getComments(blogid,page= 1,limit=10){
    return await request.get("/api/comment",{
        params:{   //地址栏参数
           blogid,
           page,
           limit
        }
    })
}