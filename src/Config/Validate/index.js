import {useMemo} from "react";


function validateLength(value,callback){
	switch (typeof(value)) {
		case "object":{
			if(Array.isArray(value)){
				return ""
			}
			break;
		}
		case "number":{
			value=value+"";
		}
		case "string":{
			value = value.trim();
			return callback && callback(value) || "";
		}
		default:
			break;
	}
	return "Kiểu dữ liệu không hợp lệ (chỉ nhận chuỗi hoặc số)";
}
function validateNumber(value,callback){
	if(value === null){
		return ""
	}
	switch (typeof(value)) {
		case "string":{
			value = value.trim();
			if(value === ""){
				return callback && callback(value) || "";
			}
			if(Number.isNaN(value));{
				break;
			}
		}
		case "number":{
			return callback && callback(value) || "";
		}
		default:					
			break;
	}
	return "Kiểu dữ liệu không hợp lệ (chỉ nhận số)";
}
export const validates = (function(){
	return {
		isRequired:function(value,props){
			const [message] = props;
			if(((typeof(value) === 'string') && (value.trim() !== ""))
				|| ((typeof(value) === 'number') && (!Number.isNaN(value)))
				|| ((typeof(value) === 'boolean') && value)
			){
				return "";
			}
			return message ?? "Vui lòng nhập trường này!"
		},isEmail:function(value,props){
			const [message,args] = props;
			let type = "example@example.com";
			if(Array.isArray(args)){
				let types = args.map((arg)=>{
					return "example@"+arg;
				});
				type = types.join(",");

			}
			const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
			if(typeof(value) === 'string'){
				if(regex.test(value)){
					if(Array.isArray(args)){
						const argsRegex = new RegExp("@("+args.join("|")+")$");
						if(argsRegex.test(value)){
							return "";
						}
					}else {
						return "";
					}
				}
			}			
			return (message && message.replaceAll("{1}",type)) || `Định dạng Email không hợp lệ! (${type})`;
		},isConfirm:function(value,props,values){
			const [reKey,message] = props;
			if(!Boolean(values) || typeof(values) !== 'object'){
				return "Danh sách giá trị không hợp lệ"
			}
			let reValue = values[reKey];
			if(value !== reValue){
				return message ?? "Giá trị không hợp lệ!";
			}
			return ""
		},isConpare:function(value,props){
			const [reValue,message] = props;
			if(value !== reValue){
				return message ?? "Giá trị không hợp lệ!";
			}
			return ""
		},isRegex:function(value,props){
			const [regex,message] = props
			if(typeof(regex) === "object" && typeof(regex.test) === "function"){
				if(regex.test(value)){
					return message ?? `Định dạng dữ liệu không hợp lệ! (${regex})`;
				}else{
					return "";
				}
				
			}else{
				return "Định dạng Regex không hợp lệ!";
			}
		},isLength:function(value,props){
			const [length,message] = props;
			return validateLength(value,function(value){
				if(value.length != length){
					return (message && message.replaceAll("{1}",length).replaceAll("{2}",value.length)) 
						|| `Vui lòng nhập ${length} kí tự!`;
				}
			})
			
		},minLength:function(value,props){
			const [length,message] = props;
			return validateLength(value,function(value){
				if(value.length < length){
					return (message && message.replaceAll("{1}",length).replaceAll("{2}",value.length)) 
						|| `Vui lòng nhập lớn hơn ${length} kí tự!`;
				}
			})
		},maxLength:function(value,props){
			const [length,message] = props;
			return validateLength(value,function(value){
				if(value.length > length){
					return (message && message.replaceAll("{1}",length).replaceAll("{2}",value.length))
						|| `Vui lòng nhập nhỏ hơn ${length} kí tự!`;
				}
			})
		},rangeLength:function(value,props){
			const [minL,maxL,message] = props;
			return validateLength(value,function(value){
				if((value.length < minL) || (value.length > maxL)){
					return (message && message.replaceAll("{1}",minL).replaceAll("{2}",maxL).replaceAll("{3}",value.length))
						|| `Vui lòng nhập từ ${minL} đên ${maxL} kí tự!`
				}
			})
		}
		,minNumber:function(value,props){
			const [num,message] = props
			return validateNumber(value,function(value){
				if(value < num){
					return (message && message.replaceAll("{1}",num)) 
					|| `Vui lòng nhập lớn hơn ${num}!`
				}
			})
			
		},maxNumber:function(value,props){
			const [num,message] = props;
			return validateNumber(value,function(value){
				if(value > num){
					return (message && message.replaceAll("{1}",num)) 
					|| `Vui lòng nhập nhỏ hơn ${num}!`
				}
			})
		},rangeNumber:function(value,props){
			const [minN,maxN,message] = props;
			return validateNumber(value,function(value){
				if((value < minN) || (value > maxN)){
					return (message && message.replaceAll("{1}",minN).replaceAll("{2}",maxN))
					|| `Vui lòng nhập trong khoảng ${minN} đến ${maxN}!`
				}
			})	
		}
	}
}());
export function checkValue(value,rulers,values,callback){
	const valids = Object.keys(rulers).reduce(function(mess,ruler){
		if(validates.hasOwnProperty(ruler)){
			const mes = validates[ruler](value,rulers[ruler],values);
			if(mes != ""){
				mess.push(mes)
			}
		}else{
			mess.push("Không tồn tại ràng buộc dữ liệu "+ruler);
		}
		return mess
	},[]);
	const error = callback && callback(valids) || valids.length;
	return error;
}
export function checkObject(values,rulerValues,callback){
	if(typeof(rulerValues) === "object" && typeof(values) === "object"){
		return Object.keys(rulerValues).reduce(function(result,key){	
			const valids = checkValue(values[key],rulerValues[key],values,function(valids){
				return callback && callback(key,valids);
			});
			return result + valids;
		},0);
	}
	return 0;
}
