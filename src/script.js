
const record = document.querySelector('.record-button')
window.electroApi.sendRecord(record)

const save = document.querySelector('.save-button');
window.electroApi.sendStop(save)
