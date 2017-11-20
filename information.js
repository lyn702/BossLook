let log = console.log.bind(console)
  const LYN = {}
  // 获取时间
  let time = function(z) {
      if (z === undefined) {
          z = new Date()
      }
      let x = z.toString()
      // ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday','Friday', 'Saterday']
      let zh = '天一二三四五六'
      let Year = x.slice(11, 15)
      let Month = z.getMonth() + 1
      let Day = x.slice(8, 10)
      let Hour = x.slice(16, 18)
      let Minute = x.slice(19, 21)
      let Second = x.slice(22, 24)
      let Week = zh[z.getDay()]
      if (String(Month).length === 1) {
          Month = '0' + Month
      }
      // log(Year,Month,Da)
      return `${Year}-${Month}-${Day}`
  }
  time()
  let date = time()

  // 获得小时数
  let hour = function(z) {
      if (z === undefined) {
          z = new Date()
      }
      let x = z.toString()
      // ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday','Friday', 'Saterday']
      let zh = '天一二三四五六'
      let Year = x.slice(11, 15)
      let Month = z.getMonth() + 1
      let Day = x.slice(8, 10)
      let Hour = x.slice(16, 18)
      let Minute = x.slice(19, 21)
      let Second = x.slice(22, 24)
      let Week = zh[z.getDay()]
      if (String(Month).length === 1) {
          Month = '0' + Month
      }
      // log(Year,Month,Da)
      return `${Hour}`
  }
  let xiaoshi = hour()
  // log(xiaoshi)

  // 获得分钟数
  let minute = function(z) {
      if (z === undefined) {
          z = new Date()
      }
      let x = z.toString()
      // ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday','Friday', 'Saterday']
      let zh = '天一二三四五六'
      let Year = x.slice(11, 15)
      let Month = z.getMonth() + 1
      let Day = x.slice(8, 10)
      let Hour = x.slice(16, 18)
      let Minute = x.slice(19, 21)
      let Second = x.slice(22, 24)
      let Week = zh[z.getDay()]
      if (String(Month).length === 1) {
          Month = '0' + Month
      }
      // log(Year,Month,Da)
      return `${Minute}`
  }
  let fenzhong = minute()
  // log(fenzhong)

  // 获取时间（总分钟数）
  let shijian = Number(xiaoshi * 60) + Number(fenzhong)
  // log(shijian)

  // 去空格
  String.prototype.html = function() {
      let html = this.slice(this.indexOf('<'))
      return html.replace(/>(\s+)</img, '><')
  }

  // 获得景区
  let scene = function() {
      let request = ({
          url: "http://120.79.12.95/cmd/scenes",
          data: {
              "device": 'H5_Web',
              "appname": 'scene_report',
          },
          header: {
              "Content-Type": "application/json"
          },
          method: 'POST',
          success: function(res) {
              var data = JSON.parse(res)
              // log('景区ID', data)
              let list = data.list
              // log(list)
              for (var i = 0; i < list.length; i++) {
                  let e = list[i]
                  // log(e.id, e.name)
              }
              // LYN['scene_id'] = data.list.id
              // log(LYN['scene_id'])
              // let temp = data.list
              // // log(temp)
              // if (temp.length < 1) {
              //     alert('当前无绑定的景区')
              // }
          }
      })
      $.ajax(request)
  }
  scene()

  // 金额，人数显示
  let today_xinxi = function() {
      let request = ({
          url: "http://120.79.12.95/tools/api/wx_boss_board",
          data: {
              "action": 'incomeAndvisitor',
              "scene_id": 1,
          },
          header: {
              "Content-Type": "application/json"
          },
          method: 'POST',
          success: function(res) {
              var data = JSON.parse(res)
              log(data)
              // let LYN.mp.html = ''
              if (data.result === 0) {
                  let money = data.info.today_income
                  let people = data.info.today_visitors
                  log(money,people)
                  let mp = `
                  <div class="money">
                      <img src="image/u301.png" alt="">
                      <div class="money-number">￥${money}</div>
                  </div>
                  <div class="people">
                      <img src="image/u305.png" alt="">
                      <div class="people-number">${people}人</div>
                  </div>
                  `
                  // log(LYN.html , mp)
                  LYN.html = mp
                  $('.mp').html(LYN.html)
              }
          }
      })
      $.ajax(request)
  }

  // 园区各个游玩项目的总收入
  let today_shouru = function() {
      let request = ({
          url: "http://120.79.12.95/tools/api/wx_boss_board",
          data: {
              "action": 'incomeOfchannels',
              "scene_id": 1,
          },
          header: {
              "Content-Type": "application/json"
          },
          method: 'POST',
          success: function(res) {
              let data = JSON.parse(res)
              log(data)
              LYN.html = ''
              if (data.result === 0) {
                  let infos = data.infos
                  // log(infos)
                  for (var i = 0; i < infos.length; i++) {
                      let info = infos[i]
                      // log(info)
                      let money = info.total_income_today
                      let channel = info.channel_name
                      let id = info.channel_id
                      // log(money,channel,id)
                      let t = `
                      <div class="fl-1" data-id="${id}">
                          <div class="fl-1-1">
                              <div class="time">${shijian}min</div>
                              <div class="qian">${money}</div>
                          </div>
                          <div class="xm">${channel}</div>
                      </div>`
                      LYN.html = LYN.html + t
                      // log(LYN.html)
                      if (i === infos.length - 1) {
                          $('.tongdao').html(LYN.html)
                      }
                  }
              }
          }
      })
      $.ajax(request)
  }

// 页面初始显示今日数据
  let onshow = function () {
      today_xinxi()
      today_shouru()
  }
  onshow()

  // 今日统计数据
  // let shuju = function (channel_id, e) {
  //     let promise = new Promise(function(resolve, reject) {
  //         let request = ({
  //             url: "http://120.79.12.95/istatistics/todayAccount",
  //             data:
  //             {
  //                 "device": 'H5_Web',
  //                 "appname": 'scene_report',
  //                 "date": 'date',
  //                 "channel_id": channel_id,
  //                 "scene_id": LYN['scene_id'],
  //                 // "time_start": timestart,
  //                 // "time_end": timeend
  //             },
  //             header: {
  //                 "Content-Type": "application/json"
  //             },
  //             method: 'POST',
  //             success: function(res) {
  //                 var data = JSON.parse(res)
  //                 resolve(data)
  //             }
  //         })
  //         $.ajax(request)
  //     })
  //     return promise
  // // }

  // 获取所有通道ID修改页面显示
  // let channels = function () {
  //     let request = ({
  //         url: "http://120.79.12.95/cmd/channels_of_scene",
  //         // 传对象 自动转JSON
  //         data:
  //         {
  //             "device": 'H5_Web',
  //             "appname": 'scene_report',
  //             "id": 1
  //         },
  //         header: {
  //                 "Content-Type": "application/json"
  //             },
  //         method: 'POST',
  //         success: function(res) {
  //             let data = JSON.parse(res)
  //             log('通道ID',data)
  //             let temp = data.list
  //             LYN.html = ''
  //             let arr = temp.slice(0 , 4)
  //             log(arr)
  //             // for (let e of arr) {
  //             for(let i = 0; i < arr.length; i++) {
  //                 let e = arr[i]
  //                 shuju(e.id, e).then(function(res) {
  //                     log(res)
  //                     // 金额
  //                     if (res.result === 1) {
  //                         let money = res.statistics.used_coming_count
  //                         let t = `
  //                         <div class="fl-1" data-id="${e.id}">
  //                             <div class="fl-1-1">
  //                                 <div class="time">${shijian}min</div>
  //                                 <div class="qian">${money}</div>
  //                         </div>
  //                         <div class="xm">${e.name}</div>
  //                         </div>`
  //                         // log(LYN.html , t)
  //                         LYN.html = LYN.html + t
  //                         if (i === arr.length - 1) {
  //                             $('.tongdao').html(LYN.html)
  //                         }
  //                     } else {
  //                         log('fial')
  //                     }
  //                 })
  //             }
  //         }
  //     })
  //     $.ajax(request)
  // }
  // channels()

  // 点击今日数据
  $('.today').on('click', function() {
      log('今日数据')
      $('.month').removeClass('click')
      $('.today').addClass('click')
      today_xinxi()
      today_shouru()
  })

  // 点击本月数据
  $('.month').on('click', function() {
      log('本月数据')
      $('.today').removeClass('click')
      $('.month').addClass('click')
  })