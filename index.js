let log = console.log.bind(console)
const su = {}
var todoList = []

// 密码显示和隐藏
let demoImg = document.getElementById("eye");
let demoInput = document.getElementById("input-mima");
//隐藏text block，显示password block
let hideShowPsw = function () {
    if (demoInput.type == "password") {
		demoInput.type = "text";
		demoImg.src = "image/xianshi.png";
	}else {
		demoInput.type = "password";
		demoImg.src = "image/yincang.png";
	}
}
// 点击眼睛执行密码显示隐藏函数
$('#eye').on('click', function() {
    hideShowPsw()
})

$(document).ready(function () {
            //读取 localStage 本地存储，填充用户名密码,如果自动登录有值直接跳转；
            //相反，跳转到本页面,等待登陆处理
            var storage = localStorage.user
            var getnickname = storage['nickname']
            log(getnickname)
            var password = localStorage.user.password
            log(password)
        });

// 用户登录并且获取景区ID
let login = function () {
    let nameInput = document.querySelector('#input-name')
    let nickname = nameInput.value
    let mimaInput = document.querySelector('#input-mima')
    let password = mimaInput.value
    log(nickname, password)
    // 储存账号密码
    localStorage.user = JSON.stringify({
        'nickname': nickname,
        'password': password,
    })
    let request = ({
        url: "https://leyuanxing.net/newapi/Wxbossboard/login",
        data: {
            // "action": 'login',
            "nickname": nickname,
            "password": password,
        },
        header: {
            "Content-Type": "application/json"
        },
        method: 'POST',
        success: function (res) {
            // let data = JSON.parse(res)
            log(res)
            // 登录成功
            if (res.result === 0) {
                // log(res.user_info.scene_id)
                let scene_id = res.user_info.scene_id
                window.location = `information.html?scene_id=${scene_id}`
            }
            // 登录失败
            else {
                alert('请您输入正确的账号，密码')
            }
        }
    })
    $.ajax(request)
}


// 点击登录按钮
$('.btn').on('click', function() {
    login()
})
