let log = console.log.bind(console)
const LYN = {}

// 密码显示和隐藏
var demoImg = document.getElementById("eye");
var demoInput = document.getElementById("input-mima");
//隐藏text block，显示password block
let hideShowPsw = function () {
    if (demoInput.type == "password") {
		demoInput.type = "text";
		eye.src = "image/xianshi.png";
	}else {
		demoInput.type = "password";
		eye.src = "image/yincang.png";
	}
}

// 用户登录并且获取景区ID
let login = function () {
    let nameInput = document.querySelector('#input-name')
    let nickname = nameInput.value
    let mimaInput = document.querySelector('#input-mima')
    let password = mimaInput.value
    log(nickname, password)
    let request = ({
        url: "http://120.79.12.95/newapi/Wxbossboard/login",
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
                LYN['scene_id'] = res.user_info.scene_id
                log(LYN['scene_id'])
                window.location = 'information.html'
            }
            // 登录失败
            else {
                alert('请您输入正确的账号密码')
            }
        }
    })
    $.ajax(request)
}
// login()

// 点击登录按钮
$('.btn').on('click', function() {
    login()
})
