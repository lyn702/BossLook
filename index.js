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
    //读取 localStage 本地存储，填充用户名密码;
    let storage = window.localStorage
    let getNickname = storage['nickname'];
    let getPassword = storage['password'];
    let getIsstorePwd = storage['isstorePwd'];
    let getIsautologin = storage["isautologin"];
    log(getNickname, getPassword, getIsstorePwd)
    if (getIsstorePwd === 'yes') {
        if (getIsautologin === 'yes') {
            if ((("" != getNickname) || (null != getNickname)) && (("" != getPassword) || (null != getPassword))) {
                
            }
        }
    }
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
        let check1 = document.getElementById('isRemberPwdId')
        log('check1', check1.checked)
        if (check1.checked) {
            storage['nickname'] = nickname;
            storage['password'] = password;
            storage['isstorePwd'] = 'yes';
        }
        else {
            storage['nickname'] = nickname;
            storage['isstorePwd'] = 'no';
        }
        // 选择自动登录
        let check2 = document.getElementById('isAutoLoginId')
        log('check2', check2.checked)
        if (check2.checked) {
            storage['nickname'] = nickname;
            storage['password'] = password;
            storage['isstorePwd'] = 'yes';
            storage['isAutoLogin'] = 'yes';
        }
        else {
            storage['nickname'] = nickname;
            storage['isAutoLogin'] = 'no';
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
                log(res)
                // 登录成功
                if (res.result === 0) {
                    let scene_id = res.user_info.scene_id
                    // log(scene_id)
                    // window.location = `information.html?scene_id=${scene_id}`
                }
                // 登录失败
                else {
                    alert('用户名或密码错误')
                }
            }
        })
        $.ajax(request)
    }
    else {
        alert('用户名密码不能为空')
    }
}


// 点击登录按钮
$('.btn').on('click', function() {
    login()
})
