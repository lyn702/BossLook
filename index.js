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

// 选择记住密码
// let readyLogin = function () {
//     let useNickname = document.querySelector('#input-name').value
//     let usePassword = document.querySelector('#input-mima').value
//     log(useNickname, usePassword)
//     if (useNickname != "" && usePassword != "") {
//         let storage = window.localStorage
//         log(storage)
//     }
// }


$(document).ready(function () {
    //读取 localStage 本地存储，填充用户名密码;
    
});

// 用户登录并且获取景区ID
let login = function () {
    let nickname = document.querySelector('#input-name').value
    let password = document.querySelector('#input-mima').value
    log(nickname, password)
    // 记住密码
    if (nickname != "" && password != "") {
        let storage = window.localStorage
        log(storage)
        let check = document.getElementById('isRemberPwdId')
        if (document.getElementById('isRemberPwdId').checked) {
            storage['nickname'] = nickname;
            storage['password'] = password;
            storage['isstorePwd'] = 'yes';
        }
        else {
            storage['nickname'] = nickname;
            storage['isstorePwd'] = 'no';
        }
    }
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
                // window.location = `information.html?scene_id=${scene_id}`
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
