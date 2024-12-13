const months = ['январь', 'февраль', 'март', 'апрель', 'май', 'июнь', 'июль', 'август', 'сентябрь', 'октябрь', 'ноябрь', 'декабрь']
const weekdays = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс']

buildCalendar(wrapper)

function buildCalendar(container, options) {
  const date = new Date
  const year = options?.year ?? date.getFullYear()
  const month = options?.month ?? date.getMonth()
  const monthName = months[month]
  const firstDate = new Date(year, month)
  const offsetBefore = (firstDate.getDay() + 6) % 7
  const lastDate = new Date(year, month + 1, 0)
  const days = Array(lastDate.getDate()).fill().map((_, i) => i + 1)
  const offsetAfter = (7 - lastDate.getDay()) % 7
  const dates = [...Array(offsetBefore).fill(''), ...days, ...Array(offsetAfter).fill('')]

  const prevMonthYear = {
    year: month ? year : year - 1,
    month: month ? month - 1 : 11
  }
  const nextMonthYear = {
    year: month === 11 ? year + 1 : year,
    month: month === 11 ? 0 : month + 1
  }

  const table = document.createElement('table')
  table.style.textAlign = 'center'
  table.innerHTML = `
    ${buildCaption(year, monthName)}
    ${buildWeekdaysHeader()}
    ${buildTBody(dates)}
  `

  table.caption.onclick = e => {
    if (e.target === table.caption.firstChild) {
      b.replaceChildren(buildCalendar(container, prevMonthYear))
    } else if (e.target === table.caption.lastChild) {
      b.replaceChildren(buildCalendar(container, nextMonthYear))
    }
  }

  container.replaceChildren(table)

  return table
}

function buildCaption(year, month) {
  return `<caption style="width: 200px"><button style="float:left">←</button>${year}, ${month}<button style="float:right">→</button></caption>`
}

function buildWeekdaysHeader() {
  const red = 'style="color:red"'
  return `<thead><tr>${weekdays.map((weekday, i) => `<th ${i > 4 ? red : ''}>${weekday}</th>`).join('')}</tr></thead>`
}

function buildTBody(values) {
  let html = '<tbody>'

  for (let i = 0; i < values.length; i += 7) {
    html += buildRow(values.slice(i, i + 7))
  }

  return html + '</tbody>'
}

function buildRow(values) {
  const red = 'style="color:red"'
  return `<tr>${values.map((value, i) => `<td ${i > 4 ? red : ''}>${value}</td>`).join('')}</tr>`
}
