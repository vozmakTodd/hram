import { DEMAND_TYPE_MESSAGE } from '~/constants'
import type { IDemandModel } from '~/types/demands'

export const getDemandMailMessage = (demand: IDemandModel) => {
  const config = useRuntimeConfig()

  return {
    from: `"Храм вмч. Георгия Победоносца в Куркине г. Москвы" <${config.mailUser}>`,
    to: config.mailOrderRecipient,
    subject: 'Заказ требы',
    text: `Поступил заказ требы ${DEMAND_TYPE_MESSAGE[demand.type]}:\n ${demand.names.join('\n')}`,
    html: `<div style="font-family: 'Georgia', 'sans-serif'; padding: 38px 0; background-color: #DFD5D7;"><div style="display: flex; gap: 14px; padding: 12px; flex-direction: column; width: 60%; align-items: center; background-color: #fff; border-radius: 12px; margin-inline: auto;" ><img src="cid:uniqueLogo" style="width: 150px;"/><span style="font-size: 16px;">Поступил заказ требы ${DEMAND_TYPE_MESSAGE[demand.type]}:</span> <ol style="font-size: 14px; margin: 0">${demand.names.reduce((acc, val) => acc + `<li>${val}</li>`, '')}</ol></div></div>`,
    attachments: [
      {
        filename: 'logo.png',
        path: './public/img/logo.png',
        cid: 'uniqueLogo' //same cid value as in the html img src
      }
    ]
  }
}
