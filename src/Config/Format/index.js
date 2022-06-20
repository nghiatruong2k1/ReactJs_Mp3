export const formatAlias =  (str)=>{
	let newStr = str
		.toLowerCase()
		.replace(/\s{1,}/g,"-")
		.replace(/[àáảãạâấầẩẫậăắằẳẵặ]/g,"a")
		.replace(/[èéẻẽẹêếềểễệ]/g,"e")
		.replace(/[íìỉĩị]/g,"i")
		.replace(/[óòỏõọôốồổỗộơớờởỡợ]/g,"o")
		.replace(/[úùủũụưứừửữự]/g,"u")
		.replace(/[ýỳỷỹỵ]/g,"y")
		.replace(/[đ]/g,"d")
	return newStr;
}
export const formatBase64 = (file)=>{
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e) => resolve(e.target.result);
      reader.onerror = error => reject(error);
    });
}
  export const formatByte =(x)=>{
    if(typeof(x) != 'number'){
        x = 0;
    }
    const units = ['bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    let l = 0, n = parseInt(x, 10) || 0;
    while(n >= 1024 && ++l){
        n = n/1024;
    }
    return(n.toFixed(n < 10 && l > 0 ? 1 : 0) + ' ' + units[l]);
}

export const typeDade = {
	"sortdate":"",
	"sortdatetime":"",
	"longdate":"",
	"longdatetime":"",
	"time":"",
}
export const formatDate = (date,strFormat)=>{
	const ndate = new Date(date);
	if(ndate == "Invalid Date"){
		return "";
	}
	return ndate.toLocaleString();
}
export const formatNumber = (number,n, x)=>{
	if(typeof(number) != "number"){
		return 0;
	}
	if(typeof(n) != "number"){
		n = 0;
	}
	if(typeof(x) != "number"){
		x = 0;
	}
    let re = '\\d(?=(\\d{' + (n || 3) + '})+' + (x > 0 ? '\\.' : '$') + ')';
    return number.toFixed(Math.max(0, ~~x)).replace(new RegExp(re, 'g'), '$&,');
}