import request from "../utils/request";

type Result = {
  status: number;
  success: boolean;
  data: Array<any>;
  id: any;
  title: string;
  scontent: string;
  contentimg: any;
  username: string
};

export const getContentList = () => {
  return request<Result>({
    method: 'GET',
    url: '/getList',
  })
}

export const getTodayLook = () => {
  return request<Result>({
    method: "GET",
    url: '/todayLook'
  })
}

export const addContentInfo = (data: object) => {
  return request<Result>({
    method: 'POST',
    url: '/add',
    data
  })
}

export const getUserContent = (username :string) => {
  return request<Result>({
    method: 'GET',
    url: `/findByUsername?username=${username}`
  })
}


export const getSearch = (title: string) => {
  return request<Result>({
    method: 'GET',
    url: `/search?title=${title}`
  })
}

//留言
export const writeMessage = (data:object) => {
  return request<Result>({
    method: 'POST',
    url: 'sendMail',
    data
  })
}

export const getMessageByUser = (getuser:string) => {
  return request<Result>({
    method: 'GET',
    url: `/getmail/${getuser}`
  })
}

export const getClassifyInfo = () => {
  return request<Result>({
    method: 'GET' ,
    url: '/getClassify'
  })
}

export const getClassifyContentList = (classify) => {
  return request<Result>({
    method:'GET',
    url: `/ContentClassify/${classify}`
  })
}
