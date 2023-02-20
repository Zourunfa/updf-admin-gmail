function setInnerText(element, content) {
  if (typeof element.innerText === 'string') {
    element.innerText = content;
  } else {
    element.textContent = content;
  }
}

const locationHerf = location.href.slice(0, 22);

if (document.readyState !== 'complete') {
  window.onhashchange = function (event) {
    let hash = window.location.hash; //通过location对象来获取hash地址
    console.log('#hash', hash); // "#/notebooks/260827/list"  从#号开始

    const adminNode = document.querySelector('.admin-info');
    adminNode && document.body.removeChild(adminNode);
    if (
      location.hash !== '#inbox' &&
      locationHerf !== 'https://admin.updf.cn/'
    ) {
      setTimeout(() => {
        const sendEmailNode = document.querySelectorAll('.gD')[0];
        const emailInfo = sendEmailNode && sendEmailNode.getAttribute('email');

        console.log(emailInfo, '---emailInfo');

        // 发消息给bg
        chrome.runtime.sendMessage(
          {
            email: emailInfo,
          },
          (response) => {
            // 答复
            // alert(res)
            console.log(response, '---答复');
            let res = JSON.parse(response);

            var theadDatas = [
              '订单号',
              '邮箱',
              '币种',
              '支付方式',
              '购买入口',
              '购买渠道',
              '地区',
              '设备',
              '支付时间',
              '注册时间',
              '下单时间',
              '支付状态',
              '订阅',
              '订单金额',
              '美金',
              '类型',
            ];
            // tbody数据
            var tbodyDatas = res.data && res.data.list;
            const gs = document.querySelector('.Bu');

            // 创建table
            var table = document.createElement('table');
            table.border = '1px';
            table.style.textAlign = 'center';
            // document.body.appendChild(table)
            console.log('gs---------', gs);
            // gs.appendChild(table);
            document.body.appendChild(table);
            table.className = 'admin-info';
            table.style.position = 'absolute';
            table.style.bottom = '0';
            table.style.width = '100%';
            table.style.background = 'white';
            table.style.height = '100px';
            table.style.zIndex = '9999';
            table.style.opacity = '0.75';
            table.style.transition = 'opacity 1s;';
            // 创建thead
            var thead = document.createElement('thead');
            table.appendChild(thead);

            // 创建thead中的tr
            var tr = document.createElement('tr');
            tr.style.height = '40px';
            tr.style.backgroundColor = 'rgb(194, 231, 255)';
            thead.appendChild(tr);
            // 创建thead中的th
            for (var i = 0; i < theadDatas.length; i++) {
              var th = document.createElement('th');
              th.style.padding = '5px 20px';
              // th.innerText = theadDatas[i];
              // 使用common.js中的innerText兼容性处理函数
              setInnerText(th, theadDatas[i]);
              tr.appendChild(th);
            }
            // 创建tbody
            var tbody = document.createElement('tbody');
            table.appendChild(tbody);
            table.addEventListener('click', () => {
              table.style.opacity = '0';
              setTimeout(() => {
                table.style.display = 'none';
              }, 1000);
            });
            // 创建tbody中的tr td
            for (var i = 0; i < tbodyDatas.length; i++) {
              // 创建tbody中的tr
              tr = document.createElement('tr');
              tbody.appendChild(tr);
              // 创建tbody中的td
              var tdData = tbodyDatas[i];

              for (var key in tdData) {
                if (
                  key === 'buyTypeFormat' ||
                  key === 'createdAtFormat' ||
                  key === 'email' ||
                  key === 'orderCurrency' ||
                  key === 'orderDeviceType' ||
                  key === 'registerAtFormat' ||
                  key === 'platform' ||
                  key === 'orderNo' ||
                  key === 'email' ||
                  key === 'statusFormat' ||
                  key === 'paidUsdPriceFormat' ||
                  key === 'paidType' ||
                  key === 'subscriptionName' ||
                  key === 'channel' ||
                  key === 'orderCountry' ||
                  key === 'paidTimeFormat' ||
                  key === 'orderPriceFormat'
                ) {
                  var td = document.createElement('td');
                  setInnerText(td, tdData[key]);
                  tr.appendChild(td);
                }
              }
              // 创建td中的删除链接
            }
          },
        );
      }, 1000);
    }
  };

  window.addEventListener('load', () => {
    let xToken = '';
    setTimeout(() => {
      chrome.storage.sync.get(['xToken'], function (item) {
        console.log(item);
        xToken = item.xToken;
        console.log(JSON.stringify(item) === '{}');
        if (JSON.stringify(item) === '{}') {
          const xToken = localStorage.getItem('token');
          chrome.storage.sync.set({ xToken: xToken }, function () {
            console.log('设置token');
          });
        }
      });

      const sendEmailNode = document.querySelectorAll('.gD')[0];
      const emailInfo = sendEmailNode && sendEmailNode.getAttribute('email');

      if (
        location.hash !== '#inbox' &&
        locationHerf !== 'https://admin.updf.cn/'
      ) {
        chrome.runtime.sendMessage(
          {
            email: emailInfo,
          },
          (response) => {
            // 答复
            // alert(res)
            console.log(response, '---respose');
            let res = JSON.parse(response);

            var theadDatas = [
              '订单号',
              '邮箱',
              '币种',
              '支付方式',
              '购买入口',
              '购买渠道',
              '地区',
              '设备',
              '支付时间',
              '注册时间',
              '下单时间',
              '支付状态',
              '订阅',
              '订单金额',
              '美金',
              '类型',
            ];
            // tbody数据
            var tbodyDatas = res.data && res.data.list;
            const gs = document.querySelector('.Bu');

            // 创建table
            var table = document.createElement('table');
            table.border = '1px';
            table.style.textAlign = 'center';
            // document.body.appendChild(table)
            // gs && gs.appendChild(table);
            document.body.appendChild(table);
            table.className = 'admin-info';
            table.style.position = 'absolute';
            table.style.bottom = '0';
            table.style.width = '100%';
            table.style.background = 'white';
            table.style.height = '100px';
            table.style.zIndex = '9999';
            table.style.opacity = '0.75';
            table.style.transition = 'opacity 1s;';
            // 创建thead
            var thead = document.createElement('thead');
            table.appendChild(thead);

            // 创建thead中的tr
            var tr = document.createElement('tr');
            tr.style.height = '40px';
            tr.style.backgroundColor = 'rgb(194, 231, 255)';
            thead.appendChild(tr);
            // 创建thead中的th
            for (var i = 0; i < theadDatas.length; i++) {
              var th = document.createElement('th');
              th.style.padding = '5px 20px';
              // th.innerText = theadDatas[i];
              // 使用common.js中的innerText兼容性处理函数
              setInnerText(th, theadDatas[i]);
              tr.appendChild(th);
            }
            // 创建tbody
            var tbody = document.createElement('tbody');
            tbody.style.backgroundColor = 'rgb(240, 254, 247)';
            table.appendChild(tbody);
            table.addEventListener('click', () => {
              table.style.opacity = '0';
              setTimeout(() => {
                table.style.display = 'none';
              }, 1000);
            });
            // 创建tbody中的tr td
            for (var i = 0; i < tbodyDatas.length; i++) {
              // 创建tbody中的tr
              tr = document.createElement('tr');
              tbody.appendChild(tr);
              // 创建tbody中的td
              var tdData = tbodyDatas[i];

              for (var key in tdData) {
                if (
                  key === 'buyTypeFormat' ||
                  key === 'createdAtFormat' ||
                  key === 'email' ||
                  key === 'orderCurrency' ||
                  key === 'orderDeviceType' ||
                  key === 'registerAtFormat' ||
                  key === 'platform' ||
                  key === 'orderNo' ||
                  key === 'email' ||
                  key === 'statusFormat' ||
                  key === 'paidUsdPriceFormat' ||
                  key === 'paidType' ||
                  key === 'subscriptionName' ||
                  key === 'channel' ||
                  key === 'orderCountry' ||
                  key === 'paidTimeFormat' ||
                  key === 'orderPriceFormat'
                ) {
                  var td = document.createElement('td');
                  setInnerText(td, tdData[key]);
                  tr.appendChild(td);
                }
              }
              // 创建td中的删除链接
            }
          },
        );
      }
    }, 1000);
  });
} else {
  afterWindowLoaded();
}

function afterWindowLoaded() {
  //Everything that needs to happen after the window is fully loaded.
}
