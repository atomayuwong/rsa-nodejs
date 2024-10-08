
//i generate key from example node-data file 
const privatekey='MIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCElyYptTNocfXl0S1dTvCp6pOxL4bdjzXCUPn5KuZr8RYbUkI4F3t5g2qgm8HDM85LXFGFC8Y+4N0lFYG8Mr0y40SPSJvGnonMkXfKilxKefe60NtCF/hdSivHdGY+HWUkatJRiQ5S3cps5aghUeyqiPMkHD0CJ9VgaumE08+IYDJQ3w6/sZRQCoGfTjGsIJqpYoJBUog4WMN/C5GO+SWZF3c6R9f13xpv4+vqRiY2YsldsEtnjS79XzLYjdTWOIB6XasWPWMdjnC5xMztK27uWLlC/nuIhNJAPLMfAWk9FTbynUWHig00KEwGxM0HSMZ8sL8nvUS+ddru3dHEocCPAgMBAAECggEAAYRxTVzjf7h+Jekk6cJzgp5KnmZ61qJC7Txb//v7sxSJOjrQwy+RnCxi1f+yUfePztD5pdoipKmSHlCGsY6rF5/+Mt2T2swJq6umgUzgDYIj0aF+QN1hXD/zDE9KtD9F3wrR6Vj2LwCWxnRCXk8/tBvpHGquUA4ApR/UGE8MOvVKm/cxbk4VBYy7rV+CpLrIWtNglaaEGpcUHyUGkKotKw/6A4rAIZAC8wh7KuiQBZIem+H3ukmtaJEXEtgcPjwkAceyvZL800L4Sv+hQ7PxGeEQmvq9a46x+ef/zQwCo6vC/NFxoHlvCqeokytNgZIddbFjsUsAaZ34tPFqZU0WYQKBgQDT/CLryl3s5jjBdluWUVXhwc6lKp+zj5KeeaasV/lwNPrYqawoZkEFblutTO0kTV8efPZV7+Ad6bunI5Nsi4vbZUqr49IshINlxMQszVaMvW98Bm7rotfJsyrbUwpDvxQELRqkMgkUc+VVUCnWrXj+8q/Dr3+lvF30Rpq3tqQHuQKBgQCgHt8ol0j2C7Ht3MQuC8xmb4UL14R+RAS0/M99jiCImElO23DKFAGToBrzDAgiofgANdzoaNxGPctDXeAYTUYpi/V26XddbL1e75FC06TSjQOyo93ur7SzsfEsxeLGBxV0HA/KUmk+Wk4mN6vMaPWoM7KvdfStIgwvY/QjXgoehwKBgQC8tKLRi5/5FyhG7/mv4k+1XDV8SmlICvLWKCz7FoVyIXd8D+61N/GByC/MIcKookeeeFdBQPwdJMhrjPvbkI27jHvgcDnUb1IY8gRAbboyJyBrI77x/FBjuR7Zhx6IGDzVSuGAcRosHs90FpxoApzHN3rHlB7phrmMjp2EFQ4H4QKBgBzmlZbo/4VRhRMO1uYMwR74IAaMJuD3e/YC75yU67Bb9Fdkak4/IC26J0MZN9qwa2f2UOIuExwmiSqmpg0c3X4gQfTtnNrjBqc9DHYIZ2aNh05WH3e2hSIuCv7u1MizfJ7RddQp3c8gU5y4Taz+gOCUPDtJShl53MMtAmLj1WW/AoGBAI1oCZRs18FQ4NTb2KB0AXjbOkbSmlg25OmLiT0D7gb/t0qLu2uiCnSuAnL6/ecdISmTMRjUqGdAKViRa4+CzdS6ldNkECwlxourzV3KJkCVGx8zqNAD35euX6HwceZ3b1FPMbDvgrnrQYeaoN6knepbr+Fmwm2MF5IyS0bgVQG/';
const publicKey='MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAhJcmKbUzaHH15dEtXU7wqeqTsS+G3Y81wlD5+Srma/EWG1JCOBd7eYNqoJvBwzPOS1xRhQvGPuDdJRWBvDK9MuNEj0ibxp6JzJF3yopcSnn3utDbQhf4XUorx3RmPh1lJGrSUYkOUt3KbOWoIVHsqojzJBw9AifVYGrphNPPiGAyUN8Ov7GUUAqBn04xrCCaqWKCQVKIOFjDfwuRjvklmRd3OkfX9d8ab+Pr6kYmNmLJXbBLZ40u/V8y2I3U1jiAel2rFj1jHY5wucTM7Stu7li5Qv57iITSQDyzHwFpPRU28p1Fh4oNNChMBsTNB0jGfLC/J71EvnXa7t3RxKHAjwIDAQAB';

const { createServer } = require('node:http');
const hostname = '127.0.0.1';
const port = 3000;
const server = createServer((req, res) => {    
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');    
    rsa= require('./rsa.js');
    
    /*
    var objecKey={
        "c":{"b":"11","a":"10"},
        "a":"100",
        "b":[{"c":"3","b":"2","a":"1"},{"c":"6","b":"5","a":"4"}]
    }*/

    var data={     
        "version": "v1",
        "service": "llpth.checkout.apply",
        "merchant_id": "142024100100794001",
        "merchant_order_id": "ORDER_202301010001",
        "order_amount": "88.99",
        "order_currency": "THB",
        "order_desc": "display your order info",
        "payment_method": "WAP_PAYMENT",
        "customer": {
            "merchant_user_id": "USER_0001",
            "full_name": "Bruce Lee"
        },
        "notify_url": "https://www.lianlianpay.co.th/sample/callback",
        "redirect_url": "https://www.lianlianpay.co.th/sample/redirect"
    }
    
   var mySort= rsa.objKeySort(data);    
   console.log(mySort);
   var signator=rsa.genSignAfterKeySort(mySort,privatekey);   
   console.log(signator);//i use signator  for request to server > 401001,\"message\":\"Merchant signature invalid
   var verifydata=rsa.verifySign(mySort,signator,publicKey)
   console.log(verifydata);   
   res.end('Server runing'); 

});
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
