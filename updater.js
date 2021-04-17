import { MichelsonMap } from '@taquito/taquito';
import { TezosToolkit } from '@taquito/taquito';

const Tezos = new TezosToolkit('https://localhost:1337'); // rpc url

Tezos.setProvider({
  signer: new InMemorySigner('YOUR_PRIVATE_KEY'),
});

importKey(
  Tezos,
  process.env.EMAIL,
  process.env.PASSWORD,
  process.env.MNEMONIC,
  process.env.SECRET
).catch((e) => console.error(e));


Tezos.contract
  .at(process.env.CONTRACTADDR)
  .then((myContract) => {
    return myContract
      .storage()
      .then((myStorage) => {
        myStorage.forEach((v) => {
           println(v[Object.keys(v)[0]])
           fs.writeFile('servers.txt', v[Object.keys(v)[0]]+"\n", { flag: 'a' }, err => {})
        })
      })
  })
  .catch((error) => println(`Error: ${JSON.stringify(error, null, 2)}`));