const UTF8 = 'utf8'
const NodeRSA = require('node-rsa')
const crypto = require('crypto')
const BASE64 = 'base64'
const pkcsSize = 2048
const pkcsType = 'pkcs8'
const key = new NodeRSA({
  b: pkcsSize, //可以知道位数
})

let newObj = ''
//排序的函数
function objKeySort(arys) {
  const toRawType = value => {
    let _toString = Object.prototype.toString
    return _toString.call(value).slice(8, -1)
  }

  //先用Object内置类的keys方法获取要排序对象的属性名数组，再利用Array的sort方法进行排序
  if (arys === null) {
    return
  }
  const newkey = Object.keys(arys).sort()
  for (let i = 0; i < newkey.length; i++) {
    const newArrKey = newkey[i]
    const newArrOne = arys[newkey[i]]
    if (newArrOne === null) {
      //业务字段为空值，空值不参与验签，如果业务值为空则不必添加进来构建签名
      return
    }
    //遍历newkey数组
    if (toRawType(newArrOne) === 'Array') {
      for (let j = 0; j < newArrOne.length; j++) {
        objKeySort(newArrOne[j])
      }
    } else if (toRawType(newArrOne) === 'Object') {
      objKeySort(newArrOne)
    } else {
      newObj += [newArrKey] + '=' + newArrOne + '&'
    }
  }
  return newObj.substring(0, newObj.length - 1)
}

//生成公私钥对
function generateKeyPair(keyLength = 2048) {
  let generatekey = new NodeRSA({ b: keyLength }) //生成多少位的密钥
  let publicDer = generatekey.exportKey(pkcsType + '-public-pem') //公钥
  let privateDer = generatekey.exportKey(pkcsType + '-private-pem') //私钥
  generatekey.setOptions({ signingScheme: 'sha1' })
  //不需要有头部尾部换行，只要一个字符串
  publicDer = publicDer.replace(/\n/g, '')
  publicDer = publicDer.replace('-----BEGIN PUBLIC KEY-----', '')
  publicDer = publicDer.replace('-----END PUBLIC KEY-----', '')
  privateDer = privateDer.replace(/\n/g, '')
  privateDer = privateDer.replace('-----BEGIN PRIVATE KEY-----', '')
  privateDer = privateDer.replace('-----END PRIVATE KEY-----', '')
  return {
    publicKey: publicDer,
    privateKey: privateDer,
  }
}

function verifySign(arg, signature, publicPem) {
  key.importKey(publicPem, pkcsType + '-public-pem')
  key.setOptions({ signingScheme: 'sha1' })
  newObj = ''
  const buffer = objKeySort(arg)
  let result = key.verify(Buffer.from(buffer), signature, 'Buffer', BASE64)
  //console.log("\n验证签名结果", result);
  return result
}

// SHA1withRSA 私钥签名
function genSignAfterKeySort(pay_request, privatePem) {
  key.importKey(privatePem, pkcsType + '-private-pem')
  key.setOptions({ signingScheme: 'sha1' })
  newObj = ''
  const buffer = objKeySort(pay_request)
  let sign = key.sign(Buffer.from(buffer), BASE64).toString(BASE64)
  //console.log("\n使用私钥签名:", sign);
  return sign
}

function objKeySortHMAC(arys) {
  //先用Object内置类的keys方法获取要排序对象的属性名数组，再利用Array的sort方法进行排序
  if (arys === null) {
    return
  }
  const newkey = Object.keys(arys).sort()
  for (let i = 0; i < newkey.length; i++) {
    const newArrKey = newkey[i]
    const newArrOne = arys[newkey[i]]
    if (newArrOne === null) {
      //业务字段为空值，空值不参与验签，如果业务值为空则不必添加进来构建签名
      return
    }
    //遍历newkey数组
    if (toRawType(newArrOne) === 'Array') {
      for (let j = 0; j < newArrOne.length; j++) {
        objKeySortHMAC(newArrOne[j])
      }
    } else if (toRawType(newArrOne) === 'Object') {
      objKeySortHMAC(newArrOne)
    } else {
      newObj += [newArrKey] + newArrOne
    }
  }
  return newObj
}

function createHMACSign(pay_request, key) {
  newObj = ''
  const _string = objKeySortHMAC(pay_request)
  const _sign = crypto.createHmac('sha256', key).update(_string).digest('hex')
  return _sign
}

function verifyHMACSign(arg, signature, key) {
  const sign = createHMACSign(arg, key)
  const result = sign === signature
  return result
}

exports = module.exports = {
  objKeySort,
  genSignAfterKeySort,
  verifySign,
  createHMACSign,
  verifyHMACSign,
  generateKeyPair
}
