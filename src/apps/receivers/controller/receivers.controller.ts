import express from 'express';
class ReceiversController {
    public url = "/receviers";
    public router = express.Router(); 
    constructor() {
        this.search();
    }
    search() {
        
        this.router.get('/serach', (req, res) => {
            res.status(200).send("<h1>성공</h1")
        })
    }
}

export default ReceiversController;

// LINK: https://yohanpro.com/posts/nodejs/express-response res.send vs res.json vs res.end 비교
//https://velog.io/@peppermint100/%ED%81%B4%EB%9E%98%EC%8A%A4-%EA%B8%B0%EB%B0%98%EC%9C%BC%EB%A1%9C-ExpressJS-%EC%95%B1-%EC%9E%91%EC%84%B1%ED%95%98%EA%B8%B0