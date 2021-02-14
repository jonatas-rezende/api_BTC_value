function api(){
  let valorBTC = document.querySelector("#terminal-coins")
  let diferenca = document.querySelector("#diferenca-valor")
  let dateTime = document.querySelector("#date-time")
  let qtd_total_bitcoins = document.querySelector("#qtd-total-bitcoins")
  let vl_total_bitcoins = document.querySelector("#vl-total-bitcoins")
  const options = { method: 'GET', mode: 'cors', cache: 'default' }

  fetch(`https://www.mercadobitcoin.net/api/BTC/ticker/`, options)
  .then(response => response.json()).then(data => { 
      abertura = parseFloat(data.ticker.open)
      valor = parseFloat(data.ticker.last)
      time = data.ticker.date
      valorBTC.innerHTML = valor.toFixed(2).replace(".", ",").replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.")
      valorTime = time*1000
      valorDatetime = new Date(valorTime)
      dia = valorDatetime.getDate()
      mes = ["JAN", "FEV", "MAR", "ABR", "MAI", "JUN", "JUL", "AGO", "SET", "OUT", "NOV", "DEZ"][valorDatetime.getMonth()];
      hora = valorDatetime.getHours()
      if(hora < 10){
        hora = "0"+hora;
      }
      min = valorDatetime.getMinutes()
      if(min < 10){
        min = "0"+min;
      }      
      stringDate = "("+mes+" "+dia+" "+hora+":"+min+" "+"UTC"+")"
      dateTime.innerHTML = stringDate
      difReais = valor - abertura
      difPorc = (difReais / abertura) * 100
      if (difReais < 0) {
        diferenca.className = "diferenca-valor-negativo"        
      }
      diferenca.innerHTML =
      difReais.toFixed(2).replace(".", ",").replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.")+" "+"("+
      difPorc.toFixed(2).replace(".", ",").replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.")+"%)"
      qtdTotal = qtd_total_bitcoins.value
      vlTotal = qtdTotal * valor
      vl_total_bitcoins.innerHTML = vlTotal.toFixed(2).replace(".", ",").replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.")+" BRL"
  })
  .catch(e => console.log('Deu Erro: '+ e.message))
}
