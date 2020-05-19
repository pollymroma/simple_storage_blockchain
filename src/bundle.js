const simpleStorageABI = [
    {
      "constant": false,
      "inputs": [
        {
          "internalType": "uint256",
          "name": "x",
          "type": "uint256"
        }
      ],
      "name": "set",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "get",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    }
  ];

  const simpleStorageAddress = '0x47342302660b1F8C710bB06455599A7AA7225b37';
  const web3 = new Web3('http://localhost:9545');
  const simpleStorage = new web3.eth.Contract(simpleStorageABI, simpleStorageAddress);

  document.addEventListener('DOMContentLoaded', () => {
    //defino con que elementos del html vamos a interactuar
    //usamos el form del index.html
    //Se ingresa info y nos llega ese dato
    const $setData = document.getElementById('setData');
    //lo metemos en data
    const $data = document.getElementById('data');
    //usamos las cuentas que se se generaron con el truffle:
    let accounts = []; //las vemos cuando conectamos con metamask

    web3.eth.getAccounts()
    .then( _accounts => {
      accounts = _accounts;
    })

    const getData =  () => {
      simpleStorage.methods
        .get()
        .call()
        .then(result => {
          $data.innerHTML = result;
        });
    };

    getData();

    $setData.addEventListener('submit', e => {
      e.preventDefault();
      const data = e.target.elements[0].value;
      simpleStorage.methods
        .set(data)
        .send({from: accounts[0]})
        .then(getData);
    });

  }); //se dispara cuando el html se cargó completo