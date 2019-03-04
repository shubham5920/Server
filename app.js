const http=require('http');
const fs=require('fs');
const server=http.createServer((req,res)=>{
  //  console.log(req.url,req.method,req.headers);
   const url=req.url;
   const method=req.method;
    if(url==='/')
    {
        //res.setHeader('content-Type','text/html');
        res.write('<html>');
        res.write('<head><title>Enter the message </title><head>');
        res.write('<body><form action="/messages" method="POST"> <input type="text" name="message" ><button type="submit">send</button></form></body>');
        res.write('</html>');
        return res.end();    


    }
    if(url==='/messages' && method==='POST')
    {
        //method for handling the chunk requests....
        const body=[];
        req.on('data',(chunk)=>{
            console.log(chunk);
            body.push(chunk);
        });
        req.on('end',()=>{
            const parsedbody=Buffer.concat(body).toString();
          //  console.log(parsedbody);
            const message=parsedbody.split('=')[1];
            fs.writeFile('message.txt',message,err =>
            {
                res.statusCode=302;
                res.setHeader('Location','/');
                return res.end();
     
            });
            
        });
     }
    //process.exit();
    res.setHeader('content-Type','text/html');
    res.write('<html>');
    res.write('<head><title>My First Page </title><head>');
    res.write('<body>Hello to Node JS</body>');
    res.write('</html>');
    res.end();


});

server.listen(3000);