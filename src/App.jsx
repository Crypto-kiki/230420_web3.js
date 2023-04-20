import { useEffect, useState } from "react";
import Web3 from "web3";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "./web3.config";

const web3 = new Web3("https://rpc-mumbai.maticvigil.com");
const contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);

function App() {
  const [account, setAccount] = useState("");
  const [myBalance, setMyBalance] = useState();
  const [name, setName] = useState();
  const [totalSupply, setTotalSupply] = useState();

  const onClickAccount = async () => {
    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      setAccount(accounts[0]);
    } catch (error) {
      console.error(error);
    }
  };
  const onClickLogOut = () => {
    setAccount("");
  };

  /* console 조회해보기
  useEffect(() => {
    console.log(contract);
    console.log(web3);
  }, []);
*/
  const onClickBalance = async () => {
    try {
      if (!account) {
        alert("지갑을 연결해주세요");
        return;
      }

      if (!contract) {
        alert("조회 가능한 컨트렉트 주소가 없습니다.");
      }

      const balance = await contract.methods.balanceOf(account).call();
      const name = await contract.methods.name().call();
      const totalSupply = await contract.methods.totalSupply().call();

      setMyBalance(parseInt(web3.utils.fromWei(balance)));
      setName(name);
      setTotalSupply(totalSupply);

      console.log(balance);
      console.log(name);
      console.log(totalSupply);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="bg-red-100 min-h-screen flex justify-center items-center">
      {account ? (
        <div>
          <div className="text-main font-semibold text-2xl">
            {account.substring(0, 4)}...
            {account.substring(account.length - 4)}
            <button className="ml-4 btn-style" onClick={onClickLogOut}>
              로그아웃
            </button>
          </div>
          <div className="flex items-center mt-4">
            {myBalance && (
              <div>
                {name} {myBalance}개
              </div>
            )}
            <button className="btn-style ml-2" onClick={onClickBalance}>
              잔액 조회
            </button>
          </div>
        </div>
      ) : (
        <button className="btn-style" onClick={onClickAccount}>
          <img
            className="w-12"
            src={`${process.env.PUBLIC_URL}/images/metamask.png`}
          />
        </button>
      )}
    </div>
  );
}

export default App;
