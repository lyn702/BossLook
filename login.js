let log = console.log.bind(console)

// 用户登录
let login = function () {
    let request = ({
        url: "http://120.79.12.95/tools/api/wx_boss_board",
        data: {
            "action": 'login',
            "nickname": 'string 用户登录名',
            "password": 'string 用户密码',
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
                log('登录成功')
            } else {
                alert('登录失败')
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
