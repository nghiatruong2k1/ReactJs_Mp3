const LocalStorage = require('./Storage/Local');
const {createContext} = require('react');

const AppContext = createContext({});
const UserContext = createContext({});
const AdminContext = createContext({});



console.log(process.env);

const WebsiteName = process.env.REACT_APP_WEBSITE_NAME;
const handleTitle = (function(){
	if(WebsiteName){
        document.title = WebsiteName;
        return function(title){
            if(title && title !== ""){
                document.title = WebsiteName+"|"+title;
            }else{
                document.title = WebsiteName;
            }
        }
    }
})();

module.exports = global.config ={
    WebsiteName:WebsiteName,
	setTitleWebsite:handleTitle,
	AppContext:AppContext,
	UserContext:UserContext,
	AdminContext:AdminContext,
	LocalStorage:LocalStorage
}
