export const getDemandMailRespMessage = (email: string) => {
  const config = useRuntimeConfig()

  return {
    from: `"Храм вмч. Георгия Победоносца в Куркине г. Москвы" <${config.mailUser}>`,
    to: email,
    subject: 'Заказ требы',
    text: 'Сообщаем, что ваш заказ требы  получил священник',
    html: `<div style="font-family: 'Georgia', 'sans-serif'; padding: 38px 0; background-color: #DFD5D7;"><div style="display: flex; padding: 12px 34px; flex-direction: column; width: 60%; align-items: center; background-color: #fff; border-radius: 12px; margin-inline: auto;" ><img src="cid:uniqueLogo" style="width: 150px;"/><p style="font-size: 16px;">Сообщаем, что ваш заказ требы получил священник</p></div></div>`,
    attachments: [
      {
        filename: 'logo.png',
        path: './public/img/logo.png',
        cid: 'uniqueLogo' //same cid value as in the html img src
      }
    ]
  }
}
